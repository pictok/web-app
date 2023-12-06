import { createServerClient } from "@supabase/ssr";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { supabaseKey, supabaseUrl } from "../supabase";
import { redirect } from "next/navigation";

export async function getFriends(cookieStore: ReadonlyRequestCookies) {
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    return;
  }

  if (!data || !data.session) {
    redirect("/login");
  }

  const { data: user, error: userError } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", data.session.user.id)
    .single();

  if (userError) {
    console.log("Error getting current user", userError);
    return;
  }
  if (!user) {
    console.log("No current user");
    redirect("/login");
  }
  const { data: friends, error: friendsError }: { data: any; error: any } =
    await supabase
      .from("friend")
      .select(
        `
        friend: friend_id (
            id,
            name,
            avatar
        )
    `,
      )
      .eq("user_id", user.id);
  if (friendsError) {
    console.log("Error getting friends", friendsError);
    return;
  }
  if (!data) {
    console.log("No friends");
    return;
  }

  const friendsResult = friends.map(
    (item: { friend: { id: any; name: any; avatar: any } }) => ({
      id: item.friend.id,
      name: item.friend.name,
      avatar: item.friend.avatar,
    }),
  );
  return friendsResult;
}
