import ImageWithSound from "@/components/design/ImageWithSound";
import Logo from "@/components/design/Logo";
import { supabase } from "@/db/supabase";
import { notFound } from "next/navigation";

export default async function SinglePhotoPage({
  params: { share_id },
}: {
  params: { share_id: string };
}) {
  if (!share_id) return notFound();

  let { data, error } = await supabase
    .from("image_audio")
    .select("*")
    .eq("share_id", share_id)
    .single();
  if (error || !data) return notFound();

  const { image_url, audio_url, caption } = data;
  return (
    <div className="mx-auto max-w-xl px-2 py-10">
      <h1 className="mb-3 text-center text-3xl">{caption}</h1>
      <h2 className="mb-3 text-center">(Tap the image to hear the sound!)</h2>
      <ImageWithSound
        image_url={image_url}
        audio_url={audio_url}
        caption={caption}
      />
      <div className="mt-5 flex items-end justify-center gap-3">
        <span className="mb-4">Created with</span>
        <Logo />
      </div>
    </div>
  );
}
