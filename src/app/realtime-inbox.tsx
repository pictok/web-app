"use client";

import { useRealtime } from "@/providers/RealtimeProvider";
import { useEffect, useMemo, useRef } from "react";

export default function RealtimeInbox() {
  const { numberOfUnreadImages } = useRealtime();
  const notification = useMemo(() => new Audio("/sound/notification.mp3"), []);

  useEffect(() => {
    if (numberOfUnreadImages > 0) {
      notification.play();
    }
    return () => {
      notification.pause();
      notification.currentTime = 0;
      notification.load();
    };
  }, [numberOfUnreadImages, notification]);

  return (
    <>
      {numberOfUnreadImages > 0 && (
        <p className="mr-6 font-normal">({numberOfUnreadImages} Unread)</p>
      )}
    </>
  );
}
