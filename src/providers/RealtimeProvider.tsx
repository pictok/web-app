"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/db/auth/getCurrentUser";
import supabase from "@/db/supabase";

type RealtimeContextType = {
  numberOfUnreadImages: number;
  setNumberOfUnreadImages: React.Dispatch<React.SetStateAction<number>>;
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
};

const realtimeContext = createContext<RealtimeContextType>({
  numberOfUnreadImages: 0,
  setNumberOfUnreadImages: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

export const RealtimeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [numberOfUnreadImages, setNumberOfUnreadImages] = useState(0);

  useEffect(() => {
    async function getUserAndUnreadImages() {
      const { count } = await supabase
        .from("inbox")
        .select("*", { count: "exact" })
        .match({ to_id: currentUser?.id, read: false });
      setNumberOfUnreadImages(count ?? 0);
    }
    getUserAndUnreadImages();
  }, [currentUser?.id]);

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
          if (payload.new.to_id !== currentUser?.id) return;
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
  }, [currentUser?.id, numberOfUnreadImages]);

  return (
    <realtimeContext.Provider
      value={{
        numberOfUnreadImages,
        setNumberOfUnreadImages,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </realtimeContext.Provider>
  );
};

export function useRealtime() {
  const context = useContext(realtimeContext);
  if (context === undefined) {
    throw new Error("useRealtime must be used within a RealtimeProvider");
  }
  return context;
}
