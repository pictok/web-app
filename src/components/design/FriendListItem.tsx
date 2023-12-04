import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Friend } from "./FriendList";

export default function FriendListItem({ friend }: { friend: Friend }) {
  return (
    <article className="mb-5 flex w-full max-w-lg items-center rounded-full border bg-card px-3 py-3 pr-3 drop-shadow-lg transition-all hover:translate-y-1 hover:bg-card/50">
      <Avatar className="h-20 w-20 border-4 border-secondary drop-shadow-sm">
        <AvatarImage
          className="object-cover"
          src={friend.avatar}
          alt={friend.name}
        />
        <AvatarFallback>
          <Skeleton className="h-20 w-20" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-grow pl-4">
        <h2 className="text-2xl font-semibold text-card-foreground">
          {friend.name}
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

export function FriendListItemSkeleton() {
  return (
    <article className="mb-5 flex w-full max-w-lg items-center rounded-full border bg-card px-3 py-3 pr-3 drop-shadow-lg">
      <Skeleton className="h-20 w-20 rounded-full" />
      <div className="flex-grow space-y-2 pl-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-40" />
      </div>
    </article>
  );
}
