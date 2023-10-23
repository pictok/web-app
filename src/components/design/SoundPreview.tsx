"use client";

import { useState } from "react";
// import SendPhotoButton from "./SendPhotoButton";
import { supabase } from "@/db/supabase";
import { getCaption } from "@/lib/getCaption";
import { getSound } from "@/lib/getSound";
import ShareButton from "./ShareButton";
import { readCaption } from "@/lib/readCaption";
import { formatCaption } from "@/lib/formatCaption";
import { Button } from "../ui/button";

export default function SoundPreview({ image }: { image: string }) {
  const [sound, setSound] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [caption, setCaption] = useState("");
  // const [isSending, setIsSending] = useState(false);

  const handleConversionToSound = async () => {
    setIsConverting(true);

    // get caption from image url
    const res1 = await getCaption(image);
    const data = await res1.json();
    const caption = formatCaption(String(data.output));
    setCaption(caption);

    //use speech to text web api to read caption to the user
    "speechSynthesis" in window
      ? readCaption(caption)
      : console.error("SpeechSynthesis is not supported in this browser.");

    // get sound from caption
    const res2 = await getSound(caption);
    const { output } = await res2.json();

    setSound(output);

    const audio = new Audio(output);
    await audio.play();

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
      setIsConverting(false);
    }
  };

  // const handleSendPhoto = async () => {
  //   setIsSending(true);
  //   // sending to user
  //   router.push(`/send-photo/complete`);
  // };

  return (
    <>
      {caption && (
        <div className="flex justify-center">
          <p className="text-center text-xl font-bold">{caption}</p>
        </div>
      )}
      {!sound && (
        <div className="flex justify-center">
          <Button onClick={handleConversionToSound} disabled={isConverting}>
            {isConverting ? "Converting..." : "Convert to sound"}
          </Button>
        </div>
      )}
      {!isConverting && sound && shareUrl && (
        <div className="flex items-center justify-center gap-5">
          <audio controls className="mx-auto">
            <source src={sound} />
          </audio>
          <ShareButton shareUrl={shareUrl} />
        </div>
      )}
      {/* <SendPhotoButton onClick={handleSendPhoto} isSending={isSending} /> */}
    </>
  );
}
