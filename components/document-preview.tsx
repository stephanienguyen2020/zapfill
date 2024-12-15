"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface DocumentPreviewProps {
  file: File | null;
  onStartFilling: () => void;
  isProcessing: boolean;
}

export function DocumentPreview({
  file,
  onStartFilling,
  isProcessing,
}: DocumentPreviewProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  // Create object URL when file changes
  useState(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Document Preview</h3>
          <Button onClick={onStartFilling} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Start Filling"
            )}
          </Button>
        </div>
        <div className="border rounded-lg p-4 min-h-[400px] flex items-center justify-center bg-gray-50">
          {file ? (
            file.type === "application/pdf" ? (
              <iframe
                src={objectUrl || ""}
                className="w-full h-[400px]"
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
