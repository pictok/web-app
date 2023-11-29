"use client";

import { supabase } from "@/db/supabase";

import { useEffect, useState } from "react";
import Image from "next/image";
import { synth } from "@/lib/speak";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import BackButton from "@/components/design/BackButton";

const audio = typeof Audio !== "undefined" ? new Audio() : null;
const speech =
  typeof SpeechSynthesisUtterance !== "undefined"
    ? new SpeechSynthesisUtterance()
    : null;
export default function Inbox() {
  const [inbox, setInbox] = useState<any[]>([]);
  const { push } = useRouter();
  const handler = useSwipeable({
    onTap: (event) => {
      const { target: overlayDiv } = event.event;
      if (overlayDiv instanceof HTMLElement) {
        const currentImage = overlayDiv.nextElementSibling;
        if (currentImage instanceof HTMLImageElement) currentImage.click();
      }
    },
    // onSwipedRight: () => {
    //   synth?.cancel();
    //   audio?.pause();
    //   push("/friends");
    // },
    trackMouse: true,
  });

  useEffect(() => {
    async function getInbox() {
      let { data, error } = await supabase
        .from("image_audio")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.log("Error getting inbox", error);
        return;
      }
      if (!data) {
        console.log("No data found");
        return;
      }
      setInbox(data);
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
        <h1 className="text-3xl font-bold">Your Inbox</h1>
      </div>

      <div
        onScroll={() => {
          synth?.cancel();
          audio?.pause();
        }}
        className="h-[90vh] snap-y snap-mandatory overflow-y-auto"
      >
        {inbox.length === 0 && (
          <div className="relative flex h-[90vh] w-full items-center justify-center">
            <p className="text-center text-2xl font-bold">
              You have no items in your inbox.
            </p>
          </div>
        )}
        {inbox.map((item) => (
          <div
            key={item.id}
            className="relative z-10 h-[90vh] w-full snap-center overflow-hidden bg-muted"
          >
            <div
              className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent via-transparent to-black"
              {...handler}
            ></div>
            <Image
              src={item.image_url}
              fill
              onClick={() => playAudio(item.audio_url, item.caption)}
              alt={item.caption}
              className="h-full object-contain"
            />
            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-5">
              <Avatar>
                <AvatarImage src="/images/avatars/user.png" />
              </Avatar>
              <p className="text-xl text-white">From Amy</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
