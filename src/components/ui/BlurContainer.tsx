
import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface BlurContainerProps {
  children: ReactNode;
  className?: string;
  darker?: boolean;
  style?: CSSProperties;
}

const BlurContainer = ({ children, className, darker = false, style }: BlurContainerProps) => {
  return (
    <div
      className={cn(
        darker ? "glass-dark" : "glass",
        "rounded-xl p-6",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
