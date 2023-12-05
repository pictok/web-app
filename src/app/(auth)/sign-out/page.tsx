"use client";

import supabase from "@/db/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const { replace } = useRouter();
  useEffect(() => {
    const signOut = async () => {
      localStorage.removeItem("currentUser");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
      replace("/");
    };
    signOut();
  }, [replace]);

  return <></>;
}
