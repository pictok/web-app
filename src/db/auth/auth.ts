import { createServerClient } from "@supabase/ssr";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { supabaseUrl } from "../supabase";

export const getCurrentUser = async (cookieStore: ReadonlyRequestCookies) => {
  const supabase = createServerClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    return;
  }

  if (!data || !data.session) {
    return;
  }

  const { data: user, error: userError } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", data.session.user.id)
    .single();

  if (userError) {
    console.log("Error getting current user", userError);
    return { user: null, error: userError };
  }
  if (!user) {
    console.log("No current user");
    return { user: null, error: userError };
  }

  return user;
};
