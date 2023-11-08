import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function FriendListItem({ friend }: { friend: string }) {
  return (
    <article className="flex h-[90px] w-[350px] items-center rounded-full border bg-card px-3 pr-3 drop-shadow-lg">
      <Avatar className="h-[72px] w-[70px] border-4 border-secondary">
        <AvatarImage className="object-cover" src="/images/avatars/user.png" />
        <AvatarFallback>{friend}</AvatarFallback>
      </Avatar>
      <div className="flex-grow pl-4">
        <h2 className="text-xl font-semibold text-card-foreground">{friend}</h2>
        <p className="text-sm text-[#767676] dark:text-[#aeaeae]">
          Vancouver, BC
        </p>
      </div>

      <ChevronRight className="h-10 w-10 stroke-foreground" />
    </article>
  );
}
