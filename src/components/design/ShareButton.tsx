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
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Share</Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-background sm:max-w-[425px]">
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
