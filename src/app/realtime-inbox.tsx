"use client";

import { useRealtime } from "@/providers/RealtimeProvider";

export default function RealtimeInbox() {
  const { numberOfUnreadImages } = useRealtime();

  return (
    <>
      {numberOfUnreadImages > 0 && (
        <p className="mr-6 font-normal">({numberOfUnreadImages} Unread)</p>
      )}
    </>
  );
}
