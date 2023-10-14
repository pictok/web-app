"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { VariantProps, cva } from "class-variance-authority";

interface RegularButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  "rounded-bl-3xl rounded-tr-3xl bg-white drop-shadow-xl border-2 border-white hover:bg-white/90 dark:bg-white/10 dark:text-white dark:border-2 dark:border-white/10",
  {
    variants: {
      variant: {
        left: "rounded-tl-none rounded-br-3xl",
        right: "rounded-br-none rounded-tl-3xl",
      },
    },
    defaultVariants: {
      variant: "left",
    },
  },
);

function RegularButton({
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
export default RegularButton;
