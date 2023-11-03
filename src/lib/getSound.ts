import { supabase } from "@/db/supabase";

export async function getSound(caption: string) {
  const { data, error } = await supabase.functions.invoke("caption-to-sound", {
    body: { caption },
  });
  const output = data?.output;
  return { output, error };
}
