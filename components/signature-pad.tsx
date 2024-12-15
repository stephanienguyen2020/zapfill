"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Pencil, Upload, Undo2 } from "lucide-react";

interface SignaturePadProps {
  onSave: (signature: string) => void;
}

export function SignaturePad({ onSave }: SignaturePadProps) {
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [mode, setMode] = useState<"draw" | "upload">("draw");

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
        <div className="border rounded-lg bg-white">
          <SignatureCanvas
            ref={sigPadRef}
            canvasProps={{
              className: "w-full h-[200px]",
            }}
          />
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="signature-upload"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="signature-upload"
            className="cursor-pointer text-gray-600"
          >
            <Upload className="h-8 w-8 mx-auto mb-2" />
            <p>Click to upload signature image</p>
          </label>
        </div>
      )}

      {mode === "draw" && (
        <div className="text-center">
          <Button onClick={handleSave}>Save Signature</Button>
        </div>
      )}
    </div>
  );
}
