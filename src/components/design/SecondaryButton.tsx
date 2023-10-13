import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function SecondaryButton(props: SecondaryButtonProps) {
  return (
    <Button
      {...props}
      variant="secondary"
      className={cn(
        "rounded-bl-2xl rounded-br-none rounded-tl-2xl rounded-tr-2xl",
        props.className,
      )}
    >
      {props.children}
    </Button>
  );
}
export default SecondaryButton;
