"use client";
import BackButton from "@/components/design/BackButton";
import FriendList from "@/components/design/FriendList";
import Navbar from "@/components/design/Navbar";
import { getFriends } from "@/db/auth/getCurrentFriends";
import { useEffect, useState } from "react";

export type Friend = {
  id: string;
  name: string;
  avatar: string;
};

export default function FriendsPage() {
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
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-between px-5">
      <div>
        <div className="relative flex items-center justify-center py-5">
          <BackButton />
          <h1 className="text-3xl font-bold">Friends</h1>
        </div>
        {/* <Searchbar searchFn={filterFriends} /> */}
        {friends && <FriendList friends={friends} />}
      </div>
      <div className="mb-5">
        <Navbar />
      </div>
    </main>
  );
}
