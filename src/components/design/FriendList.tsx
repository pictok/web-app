import Link from "next/link";
import FriendListItem from "./FriendListItem";

const friends = ["Amy Smith", "Jane Doe", "John Doe"];

export default function FriendList() {
  return (
    <div className="mt-5 space-y-10 px-5">
      {friends.map((friend) => (
        <Link key={friend} href={"/send-photo"}>
          <FriendListItem friend={friend} />
        </Link>
      ))}
    </div>
  );
}
