"use client";

import { useEffect, useState } from "react";

import supabase from "@/db/supabase";
import { getCurrentUser } from "@/db/auth/getCurrentUser";

export default function RealtimeSendReceiveImages() {
  const [currentUser, setCurrentUser] = useState<any>();
  const [numberOfUnreadImages, setNumberOfUnreadImages] = useState(() => {
    const numberOfUnreadImages = localStorage.getItem("unreadImages");
    console.log("numberOfUnreadImages", numberOfUnreadImages);
    return numberOfUnreadImages ? Number(numberOfUnreadImages) : 0;
  });

  useEffect(() => {
    async function getUser() {
      const { user, error: userError } = await getCurrentUser();
      setCurrentUser(user);
    }
    getUser();
  }, []);

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
          if (payload.new.to_id !== currentUser.id) return;
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

  return <div>realtime-send-receive-images</div>;
}
