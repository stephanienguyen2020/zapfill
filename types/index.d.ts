interface PersonalInfo {
  // ... existing fields ...
  signature?: string; // Path to signature image
}

declare module "react-signature-canvas" {
  import { ComponentType, RefObject } from "react";

  export interface SignatureCanvasProps {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    ref?: RefObject<SignatureCanvasRef>;
  }

  export interface SignatureCanvasRef {
    clear: () => void;
    toDataURL: () => string;
  }

  const SignatureCanvas: ComponentType<SignatureCanvasProps>;
  export default SignatureCanvas;
}
