"use client";

import { useState } from "react";
import ConvertButton from "./ConvertButton";
import SendPhotoButton from "./SendPhotoButton";
import { supabase } from "@/db/supabase";
import { getCaption } from "@/lib/getCaption";
import { getSound } from "@/lib/getSound";
import { useRouter } from "next/navigation";
import ShareButton from "./ShareButton";

export default function SoundPreview({ image }: { image: string }) {
  const router = useRouter();
  const [sound, setSound] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  // const [isSending, setIsSending] = useState(false);

  const handleConversionToSound = async () => {
    setIsConverting(true);

    // get caption from image url
    const res1 = await getCaption(image);
    const data = await res1.json();
    const caption = String(data.output);

    // get sound from caption
    const res2 = await getSound(caption);
    const { output } = await res2.json();
    setSound(output);

    const audio = new Audio(output);
    await audio.play();
    setIsConverting(false);

    // upload sound to supabase storage
    const res3 = await fetch(output);
    const blob = await res3.blob();
    const audioName = `${Math.random()}.mp3`.replace("/", "");
    const { error: SoundUploadError } = await supabase.storage
      .from("audio")
      .upload(audioName, blob);
    if (SoundUploadError) console.log(SoundUploadError);

    // insert image and audio url to supabase
    const audioPath =
      "https://bmtbohuzvkdifffdwayv.supabase.co/storage/v1/object/public/audio/";

    const { data: result, error: CreateImgAudioLinkError } = await supabase
      .from("image_audio")
      .insert([{ image_url: image, audio_url: audioPath + audioName }])
      .select()
      .single();
    if (CreateImgAudioLinkError) console.log(CreateImgAudioLinkError);
    if (result) {
      setShareUrl(`${location.origin}/photo/${result.share_id}`);
    }
  };

  // const handleSendPhoto = async () => {
  //   setIsSending(true);
  //   // sending to user
  //   router.push(`/send-photo/complete`);
  // };

  return !sound ? (
    <div className="flex justify-center">
      <ConvertButton
        onClick={handleConversionToSound}
        isConverting={isConverting}
      />
    </div>
  ) : (
    <div>
      {/* <SendPhotoButton onClick={handleSendPhoto} isSending={isSending} /> */}
      {!isConverting && sound.length > 0 && (
        <audio controls className="mx-auto mt-5">
          <source src={sound} />
        </audio>
      )}
      {shareUrl && <ShareButton shareUrl={shareUrl} />}
    </div>
  );
}
