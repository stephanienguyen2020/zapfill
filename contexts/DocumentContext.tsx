import { createContext, useContext, useState, useEffect } from "react";

type DocumentContextType = {
  documentFile: File | null;
  setDocumentFile: (file: File | null) => Promise<void>;
};

const DocumentContext = createContext<DocumentContextType>({
  documentFile: null,
  setDocumentFile: async () => {},
});

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documentFile, setDocumentFileState] = useState<File | null>(null);

  // Custom setter that both updates state and stores in sessionStorage
  const setDocumentFile = async (file: File | null) => {
    console.log("Setting document file:", file); // Debug log
    setDocumentFileState(file);
    if (file) {
      // Store file metadata in sessionStorage
      const metadata = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      };
      console.log("Storing metadata:", metadata); // Debug log
      sessionStorage.setItem("documentFile", JSON.stringify(metadata));

      // Store file data as base64
      const base64String = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log("File read completed"); // Debug log
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
      sessionStorage.setItem("documentFileData", base64String);
      console.log("File data stored in session"); // Debug log
    } else {
      sessionStorage.removeItem("documentFile");
      sessionStorage.removeItem("documentFileData");
    }
  };

  // Restore file from sessionStorage on initial load
  useEffect(() => {
    console.log("Checking session storage"); // Debug log
    const storedFileMetadata = sessionStorage.getItem("documentFile");
    const storedFileData = sessionStorage.getItem("documentFileData");
    console.log("Stored metadata:", storedFileMetadata); // Debug log
    console.log("Has stored data:", !!storedFileData); // Debug log

    if (storedFileMetadata && storedFileData) {
      try {
        const metadata = JSON.parse(storedFileMetadata);
        // Convert base64 back to File object
        const byteString = atob(storedFileData.split(",")[1]);
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
        console.log("Restored file:", file); // Debug log
        setDocumentFileState(file);
      } catch (error) {
        console.error("Error restoring file:", error);
      }
    }
  }, []);

  return (
    <DocumentContext.Provider value={{ documentFile, setDocumentFile }}>
      {children}
    </DocumentContext.Provider>
  );
}

export const useDocument = () => useContext(DocumentContext);
