"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabaseKey, supabaseUrl } from "@/db/supabase";

export default async function signIn(user: {
  email: string;
  password: string;
}) {
  const cookieStore = cookies();

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });

  await supabase.auth.signInWithPassword(user);
  redirect("/");
}
