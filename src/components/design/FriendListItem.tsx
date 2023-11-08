import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function FriendListItem({ friend }: { friend: string }) {
  return (
    <div className="flex items-center justify-center py-4" key={friend}>
      <div className="flex h-[90px] w-[350px] items-center rounded-full bg-card px-3 pr-9 drop-shadow-lg">
        <Avatar className="h-[72px] w-[70px] border-4 border-secondary">
          <AvatarImage
            className="object-cover"
            src="/images/avatars/user.png"
          />
          <AvatarFallback>{friend}</AvatarFallback>
        </Avatar>
        <div className="flex-grow pl-4">
          <h2 className="text-xl font-semibold text-card-foreground">
            {friend}
          </h2>
          <p className="text-sm text-gray-500">Vancouver, BC</p>
        </div>

        <ChevronRight className="stroke-foreground" />
      </div>
    </div>
  );
}
