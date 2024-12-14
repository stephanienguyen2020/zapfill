"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { ReviewForm, type Field } from "@/components/review-form";
import { PDFPreview } from "@/components/pdf-preview";

const mockFilledFields: Field[] = [
  {
    id: "fullName",
    label: "Full Name",
    value: "Joseph Clark",
    category: "general" as const,
    status: "review" as const,
  },
  {
    id: "ssn",
    label: "SSN",
    value: "1123-45-6789",
    category: "general" as const,
    status: "review" as const,
  },
  {
    id: "phone",
    label: "Phone",
    value: "(123)-(234)-(456)",
    category: "general" as const,
    status: "review" as const,
  },
  {
    id: "stateId",
    label: "StateID",
    value: "IL123456789",
    category: "detailed" as const,
    status: "review" as const,
  },
  {
    id: "address",
    label: "Address",
    value: "456 Oak Street, Apt 5B, Chicago, IL 60654, USA",
    category: "detailed" as const,
    status: "review" as const,
  },
];

const mockMissingFields = [
  { id: "emergencyName", label: "Emergency Contact Name", value: "" },
  { id: "emergencyPhone", label: "Emergency Contact Phone Number", value: "" },
  { id: "emergencyAddress", label: "Emergency Contact Address", value: "" },
];

export default function ReviewPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filledFields, setFilledFields] = useState(mockFilledFields);
  const [missingFields, setMissingFields] = useState(mockMissingFields);
  const [isDocumentRefreshed, setIsDocumentRefreshed] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);

  const handleFieldUpdate = (id: string, value: string) => {
    setFilledFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, value } : field))
    );

    setMissingFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleConfirmAutoFill = () => {
    setFilledFields((prev) =>
      prev.map((field) => ({ ...field, status: "confirmed" }))
    );
  };

  const handleApplyMissing = () => {
    // Here you would typically validate the missing fields
    setIsDownloadReady(true);
  };

  const handleRefreshDocument = () => {
    setIsDocumentRefreshed(true);
    // Simulate document refresh delay
    setTimeout(() => {
      setIsDownloadReady(true);
    }, 1500);
  };

  const handleDownload = () => {
    // Navigate to the download page
    router.push("/download");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[800px]">
          <ReviewForm
            filledFields={filledFields}
            missingFields={missingFields}
            onFieldUpdate={handleFieldUpdate}
            onConfirmAutoFill={handleConfirmAutoFill}
            onApplyMissing={handleApplyMissing}
            onRefreshDocument={handleRefreshDocument}
          />
          <PDFPreview
            fileName="Lease_Agreement_2024.pdf"
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
            onDownload={handleDownload}
            isDownloadReady={isDownloadReady}
          >
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                {isDocumentRefreshed ? (
                  <>
                    <p className="text-gray-700 font-semibold">
                      Document Refreshed
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      All information has been applied to the document.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500">PDF Preview</p>
                    <p className="text-sm text-gray-400">
                      (Preview will update after confirming or applying
                      information)
                    </p>
                  </>
                )}
              </div>
            </div>
          </PDFPreview>
        </div>
      </main>
    </div>
  );
}
