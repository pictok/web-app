import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function FriendListItem({ friend }: { friend: string }) {
  return (
    <article className="mb-5 flex w-full max-w-lg items-center rounded-full border bg-card px-3 py-3 pr-3 drop-shadow-lg transition-all hover:translate-y-1 hover:bg-card/50">
      <Avatar className="h-20 w-20 border-4 border-secondary drop-shadow-sm">
        <AvatarImage
          className="object-cover"
          src="/images/avatars/user2.jpg"
          alt="Amy Smith"
        />
        <AvatarFallback>{friend}</AvatarFallback>
      </Avatar>
      <div className="flex-grow pl-4">
        <h2 className="text-2xl font-semibold text-card-foreground">
          {friend}
        </h2>
        <p className="text-[#767676] dark:text-[#aeaeae]">Vancouver, BC</p>
      </div>

      <ChevronRight
        className="h-10 w-10 stroke-foreground"
        aria-label="Send to friend"
      />
    </article>
  );
}
