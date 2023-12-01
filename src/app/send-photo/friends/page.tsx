"use client";
import { Friend } from "@/app/friends/page";
import BackButton from "@/components/design/BackButton";
import FriendListItem from "@/components/design/FriendListItem";
import Searchbar from "@/components/design/Searchbar";
import { getFriends } from "@/db/auth/getCurrentFriends";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// const defaultFriends = ["Isabella Bennett"];

export default function FriendsPage() {
  const params = useSearchParams();
  const image = params.get("image");
  const [friends, setFriends] = useState<Friend[] | null>();
  // const filterFriends = (query: string) => {
  //   if (query === "") return setFriends(defaultFriends);
  //   const filteredFriends = friends.filter((friend) =>
  //     friend.toLowerCase().includes(query.toLowerCase()),
  //   );
  //   setFriends(filteredFriends);
  // };
  useEffect(() => {
    async function fetchFriends() {
      const { friends, error } = await getFriends();
      if (error) {
        console.error(error);
      }
      setFriends(friends);
    }
    fetchFriends();
  }, []);
  return (
    <main className="mx-auto max-w-lg">
      <div className="relative flex items-center justify-center py-5">
        <BackButton />
        <h1 className="text-3xl font-bold">Friends</h1>
      </div>
      {/* <Searchbar searchFn={filterFriends} /> */}
      <div className="mt-5 space-y-10 px-2">
        {friends &&
          friends.map((friend) => (
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
    </main>
  );
}
