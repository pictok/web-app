"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function IconButton({
  className,
  children,
  ...props
}: IconButtonProps) {
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
