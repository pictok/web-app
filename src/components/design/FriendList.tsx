import Link from "next/link";
import FriendListItem from "./FriendListItem";
import { Friend } from "@/app/friends/page";

export default function FriendList({ friends }: { friends: Friend[] }) {
  return (
    <div className="mt-5 space-y-10">
      {friends.map((friend) => (
        <Link
          key={friend.id}
          href={{
            pathname: "/photos",
            query: { friend: friend.id },
          }}
        >
          <FriendListItem friend={friend} />
        </Link>
      ))}
    </div>
  );
}
