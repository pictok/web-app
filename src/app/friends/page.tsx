"use client";
import FriendList from "@/components/design/FriendList";
import Searchbar from "@/components/design/Searchbar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const defaultFriends = ["Amy Smith", "Jane Doe", "John Doe"];

export default function FriendsPage() {
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
        <Link href="/" className="absolute left-2">
          <ChevronLeft aria-label="Go back" />
        </Link>
        <h1 className="text-3xl font-bold">Friends</h1>
      </div>
      <Searchbar searchFn={filterFriends} />
      <FriendList friends={friends} />
    </main>
  );
}
