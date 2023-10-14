"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function SecondaryButton({
  className,
  children,
  ...props
}: SecondaryButtonProps) {
  return (
    <Button
      {...props}
      variant="secondary"
      className={cn(
        "rounded-bl-3xl rounded-br-none rounded-tl-3xl rounded-tr-3xl drop-shadow-xl",
        className,
      )}
    >
      {children}
    </Button>
  );
}
export default SecondaryButton;
