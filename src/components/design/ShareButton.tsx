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

export default function ShareButton({ shareUrl }: { shareUrl: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share photo</DialogTitle>
          <DialogDescription>
            Share this link with your friends to send them the photo!
          </DialogDescription>
        </DialogHeader>
        <Input value={shareUrl} />
        <DialogFooter>
          <Button variant="secondary" onClick={copyToClipboard}>
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
