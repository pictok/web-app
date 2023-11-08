import Link from "next/link";
import FriendListItem from "./FriendListItem";

export default function FriendList() {
  return (
    <div className="mt-5 space-y-10 px-5">
      <Link href={"/send-photo"}>
        <FriendListItem friend={"Amy Smith"} />
      </Link>
    </div>
  );
}
