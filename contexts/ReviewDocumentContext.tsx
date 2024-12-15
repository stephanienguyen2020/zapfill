"use client";

import { createContext, useContext, useState, useEffect } from "react";

type ReviewDocumentContextType = {
  documentFile: File | null;
  setDocumentFile: (file: File | null) => Promise<void>;
  documentMetadata: {
    name: string;
    type: string;
    size: number;
    lastModified: number;
  } | null;
};

const ReviewDocumentContext = createContext<ReviewDocumentContextType>({
  documentFile: null,
  setDocumentFile: async () => {},
  documentMetadata: null,
});

export function ReviewDocumentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [documentFile, setDocumentFileState] = useState<File | null>(null);
  const [documentMetadata, setDocumentMetadata] =
    useState<ReviewDocumentContextType["documentMetadata"]>(null);

  const setDocumentFile = async (file: File | null) => {
    if (file) {
      // Store metadata
      const metadata = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      };
      localStorage.setItem("reviewDocumentMetadata", JSON.stringify(metadata));

      // Store file data
      const base64String = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      localStorage.setItem("reviewDocumentData", base64String);

      setDocumentFileState(file);
      setDocumentMetadata(metadata);
    } else {
      localStorage.removeItem("reviewDocumentMetadata");
      localStorage.removeItem("reviewDocumentData");
      setDocumentFileState(null);
      setDocumentMetadata(null);
    }
  };

  // Load document on initial mount
  useEffect(() => {
    const storedMetadata = localStorage.getItem("reviewDocumentMetadata");
    const storedData = localStorage.getItem("reviewDocumentData");

    if (storedMetadata && storedData) {
      try {
        const metadata = JSON.parse(storedMetadata);
        const byteString = atob(storedData.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: metadata.type });
        const file = new File([blob], metadata.name, {
          type: metadata.type,
          lastModified: metadata.lastModified,
        });

        setDocumentFileState(file);
        setDocumentMetadata(metadata);
      } catch (error) {
        console.error("Error restoring review document:", error);
      }
    }
  }, []);

  return (
    <ReviewDocumentContext.Provider
      value={{ documentFile, setDocumentFile, documentMetadata }}
    >
      {children}
    </ReviewDocumentContext.Provider>
  );
}

export const useReviewDocument = () => useContext(ReviewDocumentContext);
