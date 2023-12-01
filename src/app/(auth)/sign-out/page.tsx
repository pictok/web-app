"use client";

import supabase from "@/db/supabase";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const { replace } = useRouter();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    replace("/");
  };
  signOut();
  return <></>;
}
