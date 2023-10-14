import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { RegularButtonProps, buttonVariants } from "./RegularButton";

export function RegularButton({
  variant,
  className,
  children,
  ...props
}: RegularButtonProps) {
  return (
    <Button
      {...props}
      variant="default"
      className={cn(buttonVariants({ variant, className }))}
    >
      {children}
    </Button>
  );
}
