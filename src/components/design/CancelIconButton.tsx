import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Mic, X } from "lucide-react";

interface RecordButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function CancelIconButton({
  className,
  children,
  ...props
}: RecordButtonProps) {
  return (
    <Button
      {...props}
      className={cn("rounded-full", className)}
      variant="destructive"
      size="icon"
    >
      <X className="stroke-white" />
    </Button>
  );
}
