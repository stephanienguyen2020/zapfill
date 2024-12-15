declare module "react-signature-canvas" {
  import * as React from "react";
  class SignatureCanvas extends React.Component<any> {
    clear(): void;
    toDataURL(): string;
  }
  interface SignatureCanvasProps {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
  }
  export interface SignatureCanvasRef {
    clear: () => void;
    toDataURL: () => string;
  }
  export default React.ForwardRefExoticComponent<
    SignatureCanvasProps & React.RefAttributes<SignatureCanvasRef>
  >;
}
