import BackButton from "@/components/design/BackButton";
import SendPhotoFriendList from "./friend-list";
import { Suspense } from "react";
import { FriendListSkeleton } from "@/components/design/FriendList";

export default function FriendsPage({
  searchParams,
}: {
  searchParams: { image: string };
}) {
  const image = searchParams.image;

  return (
    <main className="mx-auto max-w-lg">
      <div className="relative flex items-center justify-center py-5">
        <BackButton />
        <h1 className="text-3xl font-bold">Friends</h1>
      </div>
      <Suspense fallback={<FriendListSkeleton />}>
        <SendPhotoFriendList image={image} />
      </Suspense>
    </main>
  );
}
