"use client";
import BackButton from "@/components/design/BackButton";
import FriendListItem from "@/components/design/FriendListItem";
import Searchbar from "@/components/design/Searchbar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const defaultFriends = ["Isabella Bennett"];

export default function FriendsPage() {
  const params = useSearchParams();
  const image = params.get("image");
  const [friends, setFriends] = useState(defaultFriends);
  const filterFriends = (query: string) => {
    if (query === "") return setFriends(defaultFriends);
    const filteredFriends = friends.filter((friend) =>
      friend.toLowerCase().includes(query.toLowerCase()),
    );
    setFriends(filteredFriends);
  };
  return (
    <main className="mx-auto max-w-lg">
      <div className="relative flex items-center justify-center py-5">
        <BackButton />
        <h1 className="text-3xl font-bold">Friends</h1>
      </div>
      <Searchbar searchFn={filterFriends} />
      <div className="mt-5 space-y-10 px-2">
        {friends.map((friend) => (
          <Link replace key={friend} href={`/send-photo?image=${image}`}>
            <FriendListItem friend={friend} />
          </Link>
        ))}
      </div>
    </main>
  );
}
