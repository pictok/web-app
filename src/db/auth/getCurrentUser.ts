import supabase from "../supabase";

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.log("Error getting current user", error);
    return { user: null, error };
  }
  if (!user) {
    console.log("No current user");
    return { user: null, error };
  }
  const { data: currentUser, error: userError } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (userError) {
    console.log("Error getting current user", userError);
    return { user: null, error: userError };
  }
  if (!currentUser) {
    console.log("No current user");
    return { user: null, error: userError };
  }

  return { user: currentUser, error };
}
