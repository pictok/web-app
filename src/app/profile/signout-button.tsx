"use client";

import { Button } from "@/components/ui/button";
import supabase from "@/db/supabase";

export default function SignOutButton() {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    window.location.replace("/");
  };
  return (
    <Button
      onClick={async () => await signOut()}
      variant="secondary"
      className="mt-3 text-sm text-foreground"
    >
      Sign out
    </Button>
  );
}
