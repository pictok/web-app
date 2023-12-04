import supabase from "@/db/supabase";

export const getInbox = async (userId: string) => {
  let { data, error } = await supabase
    .from("inbox")
    .select(
      `
          *,
          media: image_url (
            image_url,
            audio_url,
            caption
          ),
          from: from_id (
            avatar,
            name
          )
        `,
    )
    .eq("to_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Error getting inbox", error);
    return;
  }
  if (!data) {
    console.log("No data found");
    return;
  }
  return data;
};
