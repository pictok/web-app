"use client";

import { ChevronLeft } from "lucide-react";
import { supabase } from "@/db/supabase";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const syth = window ? window.speechSynthesis : undefined;
const audio = typeof Audio !== "undefined" ? new Audio() : null;
const speech =
  typeof SpeechSynthesisUtterance !== "undefined"
    ? new SpeechSynthesisUtterance()
    : null;
export default function Inbox() {
  const [inbox, setInbox] = useState<any[]>([]);

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
  }, []);

  const playAudio = (audio_url: string, caption: string) => {
    if (!audio || !speech) return;
    syth?.cancel();
    audio.pause();
    speech.text = caption;
    syth?.speak(speech);
    speech.onend = () => {
      audio.src = audio_url;
      audio.play();
    };
  };

  return (
    <main className="mx-auto max-h-screen max-w-lg overflow-hidden px-2">
      <div className="relative flex items-center justify-center py-5">
        <Link href="/" className="absolute left-2">
          <ChevronLeft aria-label="Go back" />
        </Link>
        <h1 className="text-3xl font-bold">Inbox</h1>
      </div>

      <div
        onScroll={() => {
          syth?.cancel();
          audio?.pause();
        }}
        className="h-[90vh] snap-y snap-mandatory overflow-y-auto"
      >
        {inbox.length === 0 && (
          <div className="relative flex h-[90vh] w-full">
            <p className="text-2xl font-bold">No items in inbox</p>
          </div>
        )}
        {inbox.map((item) => (
          <div
            key={item.id}
            className="relative h-[90vh] w-full snap-center overflow-hidden bg-muted"
          >
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
