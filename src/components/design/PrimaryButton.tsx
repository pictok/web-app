"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function PrimaryButton({
  className,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        "rounded-bl-2xl rounded-br-2xl rounded-tl-none rounded-tr-2xl",
        className,
      )}
    >
      {children}
    </Button>
  );
}
