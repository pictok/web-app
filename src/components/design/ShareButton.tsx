import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function ShareButton({ shareUrl }: { shareUrl: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">Share</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Input value={shareUrl} />
      </PopoverContent>
    </Popover>
  );
}
