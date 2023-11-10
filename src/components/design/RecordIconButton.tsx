"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Mic } from "lucide-react";

interface RecordButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function RecordIconButton({
  className,
  children,
  ...props
}: RecordButtonProps) {
  return (
    <Button
      {...props}
      className={cn("rounded-full dark:bg-secondary", className)}
      size="icon"
      aria-label="Record Voice"
    >
      <Mic className="stroke-white" aria-label="Record Voice" />
    </Button>
  );
}
