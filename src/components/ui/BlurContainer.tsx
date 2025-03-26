
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BlurContainerProps {
  children: ReactNode;
  className?: string;
  darker?: boolean;
}

const BlurContainer = ({ children, className, darker = false }: BlurContainerProps) => {
  return (
    <div
      className={cn(
        darker ? "glass-dark" : "glass",
        "rounded-xl p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
