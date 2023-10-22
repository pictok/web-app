import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/";

export default function ShareButton({ shareUrl }: { shareUrl: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>Share</PopoverTrigger>
      <PopoverContent></PopoverContent>
    </Popover>
  );
}
