import supabase from "../supabase";
import { getCurrentUser } from "./getCurrentUser";

export async function getFriends() {
  const { user, error: userError } = await getCurrentUser();
  if (userError) {
    console.log("Error getting current user", userError);
    return { friends: null, error: userError };
  }
  if (!user) {
    console.log("No current user");
    return { friends: null, error: userError };
  }
  const { data, error: friendsError }: { data: any; error: any } =
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
    return { friends: null, error: friendsError };
  }
  if (!data) {
    console.log("No friends");
    return { friends: null, error: friendsError };
  }

  const friends = data.map(
    (item: { friend: { id: any; name: any; avatar: any } }) => ({
      id: item.friend.id,
      name: item.friend.name,
      avatar: item.friend.avatar,
    }),
  );

  return { friends, error: null };
}
