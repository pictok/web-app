import Link from "next/link";
import { cookies } from "next/headers";
import { getFriends } from "@/db/auth/getCurrentFriends";
import FriendListItem, { FriendListItemSkeleton } from "./FriendListItem";

export type Friend = {
  id: string;
  name: string;
  avatar: string;
};

export default async function FriendList() {
  const cookieStore = cookies();
  const friends = await getFriends(cookieStore);
  return (
    <div className="mt-5 space-y-10">
      {friends.map((friend: Friend) => (
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

export function FriendListSkeleton() {
  return (
    <div className="mt-5 space-y-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <FriendListItemSkeleton key={i} />
      ))}
    </div>
  );
}
