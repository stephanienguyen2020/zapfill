"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface DocumentPreviewProps {
  file: File | null;
  isProcessing: boolean;
}

export function DocumentPreview({ file, isProcessing }: DocumentPreviewProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  // Create object URL when file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <Card className="p-6 h-full">
      <div className="flex flex-col h-full space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Document Preview</h3>
        </div>
        <div className="border rounded-lg p-4 flex-1 flex items-center justify-center bg-gray-50">
          {file ? (
            file.type === "application/pdf" ? (
              <iframe
                src={objectUrl || ""}
                className="w-full h-full"
                title="PDF Preview"
              />
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500">{file.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )
          ) : (
            <div className="text-center text-gray-500">
              No document selected
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
