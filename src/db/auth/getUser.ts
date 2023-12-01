import supabase from "../supabase";

export async function getUser(id: number) {
  const { data, error }: { data: any; error: any } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error getting user", error);
    return { user: null, error };
  }
  if (!data) {
    console.log("No user");
    return { user: null, error };
  }

  return { user: data, error };
}
