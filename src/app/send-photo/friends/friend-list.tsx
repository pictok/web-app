import { Friend } from "@/components/design/FriendList";
import FriendListItem from "@/components/design/FriendListItem";
import { getFriends } from "@/db/auth/getCurrentFriends";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function SendPhotoFriendList({
  image,
}: {
  image: string;
}) {
  const cookieStore = cookies();
  const friends = await getFriends(cookieStore);
  return (
    <div className="mt-5 space-y-10 px-2">
      {friends &&
        friends.map((friend: Friend) => (
          <Link
            replace
            key={friend.id}
            href={{
              pathname: `/send-photo/complete`,
              query: { image, friend: friend.id },
            }}
          >
            <FriendListItem friend={friend} />
          </Link>
        ))}
    </div>
  );
}
