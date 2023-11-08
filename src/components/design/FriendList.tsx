import Link from "next/link";
import FriendListItem from "./FriendListItem";

const friendsList = ["Amy", "Lisa", "John", "Bob", "Sally"];
export default function FriendList() {
  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-5">
      {friendsList.map((friend) => (
        <Link href={"/send-photo"} key={friend}>
          <FriendListItem friend={friend} />
        </Link>
      ))}
    </div>
  );
}
