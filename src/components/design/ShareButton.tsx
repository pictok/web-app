import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export default function ShareButton({ shareUrl }: { shareUrl: string }) {
  const { toast } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied to clipboard!",
      duration: 2000,
      className:
        "border-2 border-white bg-white drop-shadow-md hover:bg-white/90 dark:border-2 dark:border-white/10 dark:bg-white/10 dark:text-white",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Share</Button>
      </DialogTrigger>
      <DialogContent className=" border-2 border-white bg-white drop-shadow-md hover:bg-white/90 dark:border-2 dark:border-white/10 dark:bg-white/10 dark:text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share photo</DialogTitle>
          <DialogDescription>
            Share the visual and audio experience with your friends!
          </DialogDescription>
        </DialogHeader>
        <Input readOnly value={shareUrl} />
        <DialogFooter>
          <Button variant="default" onClick={copyToClipboard}>
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
