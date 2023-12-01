"use client";

import { supabase } from "@/db/supabase";

import { useEffect, useState } from "react";
import Image from "next/image";
import { synth } from "@/lib/speak";
import { useSwipeable } from "react-swipeable";
import { useRouter, useSearchParams } from "next/navigation";
import BackButton from "@/components/design/BackButton";
import { getCurrentUser } from "@/db/auth/getCurrentUser";

const audio = typeof Audio !== "undefined" ? new Audio() : null;
const speech =
  typeof SpeechSynthesisUtterance !== "undefined"
    ? new SpeechSynthesisUtterance()
    : null;
export default function Photos() {
  const [photos, setPhotos] = useState<any[]>([]);
  const { replace } = useRouter();
  const params = useSearchParams();
  const friendId = Number(params.get("friend"));

  const handler = useSwipeable({
    onTap: (event) => {
      const { target: overlayDiv } = event.event;
      if (overlayDiv instanceof HTMLElement) {
        const currentImage = overlayDiv.nextElementSibling?.nextElementSibling;
        if (currentImage instanceof HTMLImageElement) currentImage.click();
      }
    },
    onSwipedRight: async (event) => {
      synth?.cancel();
      audio?.pause();
      const { target: overlayDiv } = event.event;
      if (overlayDiv instanceof HTMLElement) {
        const currentImage = overlayDiv.nextElementSibling;
        if (currentImage instanceof HTMLInputElement) {
          const { user, error } = await getCurrentUser();
          if (error) {
            console.error(error);
            return;
          }
          const image = currentImage.value;
          const photo = {
            image_url: image,
            from_id: user.id,
            to_id: friendId,
          };
          await supabase.from("inbox").insert([photo]);
          const params = new URLSearchParams();
          params.set("friend", `${friendId}`);
          replace(`/send-photo/complete?${params.toString()}`);
        }
      }
    },
    trackMouse: true,
  });

  useEffect(() => {
    async function getInbox() {
      const { user, error: userError } = await getCurrentUser();
      if (userError) {
        console.error(userError);
        return;
      }
      const { data, error } = await supabase
        .from("image_audio")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.log("Error getting inbox", error);
        return;
      }
      if (!data) {
        console.log("No data found");
        return;
      }
      setPhotos(data);
    }

    getInbox();
    return () => {
      synth?.cancel();
      audio?.pause();
    };
  }, []);

  const playAudio = (audio_url: string, caption: string) => {
    if (!audio || !speech) return;
    synth?.cancel();
    audio.pause();
    speech.text = caption;
    synth?.speak(speech);
    speech.onend = () => {
      audio.src = audio_url;
      audio.play();
    };
  };

  return (
    <main className="mx-auto max-h-screen max-w-lg overflow-hidden">
      <div className="relative flex items-center justify-center py-5">
        <BackButton />
        <h1 className="text-3xl font-bold">Your Photos</h1>
      </div>

      <div
        onScroll={() => {
          synth?.cancel();
          audio?.pause();
        }}
        className="h-[90vh] snap-y snap-mandatory overflow-y-auto"
      >
        {photos.length === 0 && (
          <div className="relative flex h-[90vh] w-full items-center justify-center">
            <p className="text-2xl font-bold">You have no uploaded photos.</p>
          </div>
        )}
        {photos.map((item) => (
          <div
            key={item.id}
            className="relative z-10 h-[90vh] w-full snap-center overflow-hidden bg-muted"
          >
            <div
              className="absolute left-0 top-0 z-10 h-full w-full"
              {...handler}
            ></div>
            <input type="hidden" value={item.image_url} />
            <Image
              src={item.image_url}
              fill
              onClick={() => playAudio(item.audio_url, item.caption)}
              alt={item.caption}
              className="h-full object-contain"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
