import supabase from "@/db/supabase";

export async function getStoryCaption(image: string) {
  const { data, error } = await supabase.functions.invoke(
    "convert-image-to-story",
    {
      body: { image },
    },
  );
  const story: string = data?.story;
  const caption: string = data?.caption;
  return { story, caption, error };
}
