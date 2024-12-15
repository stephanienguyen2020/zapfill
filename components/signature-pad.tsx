"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Upload, Undo2 } from "lucide-react";
import { SignatureCanvasRef } from "react-signature-canvas";

// Wrap the entire SignaturePad component
const SignaturePadComponent = dynamic(() => Promise.resolve(SignaturePad), {
  ssr: false,
});

const SignatureCanvas = dynamic(() => import("react-signature-canvas"), {
  ssr: false,
});

interface SignaturePadProps {
  onSave: (signature: string) => void;
}

function SignaturePad({ onSave }: SignaturePadProps) {
  const sigPadRef = useRef<SignatureCanvasRef>(null);
  const [mode, setMode] = useState<"draw" | "upload">("draw");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    sigPadRef.current?.clear();
  };

  const handleSave = () => {
    if (sigPadRef.current) {
      const dataUrl = sigPadRef.current.toDataURL();
      onSave(dataUrl);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <div className="space-x-2">
          <Button
            size="sm"
            variant={mode === "draw" ? "default" : "outline"}
            onClick={() => setMode("draw")}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Draw
          </Button>
          <Button
            size="sm"
            variant={mode === "upload" ? "default" : "outline"}
            onClick={() => setMode("upload")}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        {mode === "draw" && (
          <Button size="sm" variant="outline" onClick={clear}>
            <Undo2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {mode === "draw" ? (
        <>
          <div className="border rounded-lg bg-white">
            <SignatureCanvas
              ref={sigPadRef}
              canvasProps={{
                className: "w-full h-[200px]",
              }}
            />
          </div>
          <div className="text-center">
            <Button onClick={handleSave}>Save Signature</Button>
          </div>
        </>
      ) : (
        <div
          className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
          onClick={handleUploadClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">
            Click to upload signature image
          </p>
          <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG</p>
        </div>
      )}
    </div>
  );
}

export default SignaturePadComponent;
