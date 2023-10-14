"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function PrimaryIconButton({
  className,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      {...props}
      className={cn("rounded-full text-white dark:bg-secondary", className)}
      size="icon"
    >
      {children}
    </Button>
  );
}
