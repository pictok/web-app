"use client";

import { useEffect, useState } from "react";

import supabase from "@/db/supabase";

export default function RealtimeInbox() {
  const [numberOfUnreadImages, setNumberOfUnreadImages] = useState(() => {
    const numberOfUnreadImages = localStorage.getItem("unreadImages");
    console.log("numberOfUnreadImages", numberOfUnreadImages);
    return numberOfUnreadImages ? Number(numberOfUnreadImages) : 0;
  });

  useEffect(() => {
    const channel = supabase
      .channel("realtime inbox")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "inbox",
        },
        (payload) => {
          // Store the number of unread images in local storage
          localStorage.setItem(
            "unreadImages",
            (Number(numberOfUnreadImages) + 1).toString(),
          );
          setNumberOfUnreadImages(
            (numberOfUnreadImages) => numberOfUnreadImages + 1,
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  });

  return (
    <>
      {numberOfUnreadImages > 0 && (
        <p className="mr-6 font-normal">({numberOfUnreadImages} Unread)</p>
      )}
    </>
  );
}
