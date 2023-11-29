import Link from "next/link";
import FriendListItem from "./FriendListItem";

export default function FriendList({ friends }: { friends: string[] }) {
  return (
    <div className="mt-5 space-y-10">
      {friends.map((friend) => (
        <Link key={friend} href={"/photos"}>
          <FriendListItem friend={friend} />
        </Link>
      ))}
    </div>
  );
}
