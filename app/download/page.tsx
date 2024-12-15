"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";
import { useReviewDocument } from "@/contexts/ReviewDocumentContext";
import { DocumentPreview } from "@/components/document-preview";

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();
  const { documentFile } = useReviewDocument();

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create download link for the filled PDF
      const response = await fetch("/documents/[Filled]ZapFill_S2.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "[Filled]ZapFill_S2.pdf";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUploadNew = () => {
    router.push("/upload");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Your Document Is Ready for Download!
          </h1>
          <p className="text-gray-600 text-lg mb-8 text-center">
            Your document is finalized and ready! Click the button below to
            download it instantly. Make sure to review it for any necessary
            changes before submission.
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            <Button size="lg" onClick={handleDownload} disabled={isDownloading}>
              <Download className="mr-2 h-5 w-5" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
            <Button size="lg" variant="outline" onClick={handleUploadNew}>
              <Upload className="mr-2 h-5 w-5" />
              Upload New
            </Button>
          </div>

          <div className="h-[calc(100vh-24rem)]">
            <DocumentPreview
              file={documentFile}
              isProcessing={false}
              pdfUrl="/documents/[Filled]ZapFill_S2.pdf"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
