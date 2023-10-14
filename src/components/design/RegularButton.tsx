import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { VariantProps, cva } from "class-variance-authority";

interface RegularButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  "rounded-bl-2xl rounded-tr-2xl bg-white drop-shadow-xl border hover:bg-white/90",
  {
    variants: {
      variant: {
        left: "rounded-tl-none rounded-br-2xl",
        right: "rounded-br-none rounded-tl-2xl",
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
