"use client";

import { useRealtime } from "@/providers/RealtimeProvider";
import { useEffect, useRef } from "react";

export default function RealtimeInbox() {
  const { numberOfUnreadImages } = useRealtime();

  useEffect(() => {
    const notification = new Audio("/sound/notification.mp3");
    if (numberOfUnreadImages > 0) {
      notification.play();
    }
    return () => {
      notification.pause();
    };
  }, [numberOfUnreadImages]);

  return (
    <>
      {numberOfUnreadImages > 0 && (
        <p className="mr-6 font-normal">({numberOfUnreadImages} Unread)</p>
      )}
    </>
  );
}
