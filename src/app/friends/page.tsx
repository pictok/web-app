import BackButton from "@/components/design/BackButton";
import FriendList, { FriendListSkeleton } from "@/components/design/FriendList";
import Navbar from "@/components/design/Navbar";
import { Suspense } from "react";

export default function FriendsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-between px-5">
      <div>
        <div className="relative flex items-center justify-center py-5">
          <BackButton />
          <h1 className="text-3xl font-bold">Friends</h1>
        </div>
        <Suspense fallback={<FriendListSkeleton />}>
          <FriendList />
        </Suspense>
      </div>
      <div className="mb-5">
        <Navbar />
      </div>
    </main>
  );
}
