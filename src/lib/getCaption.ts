import supabase from "@/db/supabase";

export async function getCaption(image: string) {
  const { data, error } = await supabase.functions.invoke(
    "convert-image-to-story",
    {
      body: { image },
    },
  );
  const caption: string = data?.output;
  const test: string = data?.test;
  return { caption, test, error };
}
