import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

interface DocumentPreviewProps {
  file: File;
  onStartFilling: () => void;
  isProcessing: boolean;
}

export function DocumentPreview({ file, onStartFilling, isProcessing }: DocumentPreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Document Preview</h3>
          <Button 
            onClick={onStartFilling}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Start Filling'
            )}
          </Button>
        </div>
        <div className="border rounded-lg p-4 min-h-[400px] flex items-center justify-center bg-gray-50">
          {preview ? (
            <img 
              src={preview} 
              alt="Document preview" 
              className="max-w-full max-h-[400px] object-contain"
            />
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-500">
                {file.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

