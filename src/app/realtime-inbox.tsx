"use client";

import supabase from "@/db/supabase";
import { useEffect, useState } from "react";

export default function RealtimeInbox({
  numberOfUnreadImages,
  userId,
}: {
  userId: number;
  numberOfUnreadImages: number;
}) {
  const [unreadCount, setUnreadCount] = useState(numberOfUnreadImages);
  // useEffect(() => {
  //   const channel = supabase
  //     .channel("realtime inbox")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "inbox",
  //       },
  //       async (payload) => {
  //         if (payload.new.to_id !== userId) return;
  //         const { count } = await supabase
  //           .from("inbox")
  //           .select("*", { count: "exact" })
  //           .match({ to_id: userId, read: false });
  //         setUnreadCount(count ?? 0);
  //       },
  //     )
  //     .subscribe();

  //   return () => {
  //     channel.unsubscribe();
  //   };
  // }, [numberOfUnreadImages, userId]);

  // useEffect(() => {
  //   const notification = new Audio("/sound/notification.mp3");
  //   if (unreadCount > 0) {
  //     notification.play();
  //   }
  //   return () => {
  //     notification.remove();
  //   };
  // }, [unreadCount]);

  return (
    <>
      {unreadCount > 0 && (
        <p className="mr-6 font-normal">({unreadCount} Unread)</p>
      )}
    </>
  );
}
