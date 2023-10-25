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

  const { image_url, audio_url } = data;
  return (
    <div className="mx-auto my-10 max-w-xl">
      <h1 className="mb-10 text-center text-3xl">
        Tap the image to play sound.
      </h1>
      <ImageWithSound image_url={image_url} audio_url={audio_url} />
      <div className="mt-5 flex items-end justify-center gap-5">
        <span>Created with </span>
        <Logo />
      </div>
    </div>
  );
}
