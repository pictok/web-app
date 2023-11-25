"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { VariantProps, cva } from "class-variance-authority";

interface RegularButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  "rounded-bl-3xl rounded-tr-3xl bg-[#F8F5F1] drop-shadow-md hover:bg-[#F8F5F1]/80 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-2 dark:border-white/10",
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
