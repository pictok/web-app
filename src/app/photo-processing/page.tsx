"use client";

import LoadSpinnerSVG from "@/components/icons/LoadSpinnerSVG";

import { useEffect, useReducer, useRef, useState } from "react";
import supabase from "@/db/supabase";

import Image from "next/image";

import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import { randomName } from "@/lib/randomImageName";
import Gesture from "@/components/design/Gesture";
import { useTheme } from "next-themes";

import BackButton from "@/components/design/BackButton";
import { getCurrentUser } from "@/db/auth/getCurrentUser";

const storagePath =
  "https://bmtbohuzvkdifffdwayv.supabase.co/storage/v1/object/public";

type ReducerState = {
  status:
    | "uploading photo to supabase"
    | "finished uploading photo to supabase"
    | "converting photo to story"
    | "finished converting photo to story"
    | "converting story to sound caption"
    | "finish converting story to sound caption"
    | "show tap gesture one"
    | "show swipe right gesture two"
    | "finished processing";
  story: string;
  imageUrl: string;
  caption: string;
  audioUrl: string;
};

type ReducerAction =
  | {
      status: "uploading photo to supabase";
    }
  | {
      status: "finished uploading photo to supabase";
      imageUrl: string;
    }
  | {
      status: "converting photo to story";
    }
  | {
      status: "finished converting photo to story";
      story: string;
    }
  | {
      status: "converting story to sound caption";
    }
  | {
      status: "finish converting story to sound caption";
      caption: string;
    }
  | {
      status: "show tap gesture one";
      audioUrl: string;
    }
  | {
      status: "show swipe right gesture two";
    }
  | {
      status: "finished processing";
    };

const initialState: ReducerState = {
  status: "uploading photo to supabase",
  story: "",
  imageUrl: "",
  caption: "",
  audioUrl: "",
};

const photoProcessingReducer = (
  state: ReducerState,
  action: ReducerAction,
): ReducerState => {
  switch (action.status) {
    case "finished uploading photo to supabase": {
      return { ...state, status: action.status, imageUrl: action.imageUrl };
    }
    case "finished converting photo to story": {
      return {
        ...state,
        status: action.status,
        story: action.story,
      };
    }
    case "finish converting story to sound caption": {
      return {
        ...state,
        status: action.status,
        caption: action.caption,
      };
    }
    default:
      return { ...state, ...action };
  }
};

const audio = typeof Audio !== "undefined" ? new Audio() : null;
const bgm = typeof Audio !== "undefined" ? new Audio() : null;

export default function PhotoProcessing({
  searchParams: { photoBlobUrl },
}: {
  searchParams: { photoBlobUrl: string };
}) {
  const router = useRouter();
  const { theme } = useTheme();
  const [state, dispatch] = useReducer(photoProcessingReducer, initialState);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const t0Ref = useRef<number>();
  const t1Ref = useRef<number>();

  const { status, imageUrl, caption, story, audioUrl } = state;
  const systemDark =
    theme === "system" &&
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDark = theme === "dark" || systemDark;
  const isProcessing =
    status == "uploading photo to supabase" ||
    status == "finished uploading photo to supabase" ||
    status == "converting photo to story" ||
    status == "finished converting photo to story" ||
    status == "converting story to sound caption" ||
    status == "finish converting story to sound caption";

  const handler = useSwipeable({
    onSwipedRight: () => {
      const params = new URLSearchParams();
      params.set("image", imageUrl);
      if (status == "finished processing")
        router.replace(`/send-photo/friends?${params.toString()}`);
    },
    onTap: () => {
      if (status == "finished processing" || status == "show tap gesture one") {
        synth?.cancel();

        const utterance = new SpeechSynthesisUtterance(story);
        synth?.speak(utterance);
        utterance.onend = () => {
          if (audio) {
            audio.src = audioUrl;
            audio.play();

            audio.onended = () => {
              dispatch({
                status: "show swipe right gesture two",
              });
              const utterance = new SpeechSynthesisUtterance(
                "Swipe right to send to friends",
              );
              synth?.speak(utterance);
              utterance.onend = () => {
                dispatch({
                  status: "finished processing",
                });
              };
            };
          }
        };
      }
    },
    trackMouse: true,
  });

  useEffect(() => {
    setSynth(window.speechSynthesis);
  }, []);

  // This useEffect is for playing the loading music
  useEffect(() => {
    if (bgm) {
      bgm.src = "/sound/image-processing-bgm.mp3";
      bgm.volume = 0.2;
    }
    const speak = (text: string) => {
      if (synth) {
        const utterance = new SpeechSynthesisUtterance(text);
        synth?.speak(utterance);
        return utterance;
      }
    };
    const playLoadingMusic = () => {
      const utterance = speak("Image processing in progress please wait");
      if (utterance) {
        utterance.onend = () => {
          if (bgm) bgm.play();
        };
      }
    };

    if (audioUrl) {
      if (bgm) {
        bgm.pause();
      }
      return;
    }

    playLoadingMusic();
    return () => {
      synth?.cancel();
      if (bgm) {
        bgm.pause();
      }
    };
  }, [synth, audioUrl]);

  // This useEffect is for uploading the photo to supabase storage
  useEffect(() => {
    const uploadImageToSupabase = async () => {
      t0Ref.current = performance.now();
      try {
        const response = await fetch(photoBlobUrl);
        // Blob object
        const imageBlob = await response.blob();
        //Generate a random image name that will be used
        // to store the image in supabase storage
        const imageName =
          (await randomName()) + imageBlob.type.replace("image/", ".");
        const { data, error: imageUploadError } = await supabase.storage
          .from("images")
          // We can upload imageName using either a Blob object or a File object
          .upload(imageName, imageBlob);
        if (imageUploadError) {
          throw imageUploadError;
        }
        if (!data) {
          throw new Error("Image failed to upload");
        }
        //Get the photo url string
        const imageUrl = `${storagePath}/images/${data?.path}`;
        dispatch({
          status: "finished uploading photo to supabase",
          imageUrl,
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (status == "uploading photo to supabase") uploadImageToSupabase();
  }, [photoBlobUrl, status]);

  // This useEffect is for converting the photo to story
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch("/api/story", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        });
        if (!res.ok || !res.body) {
          throw new Error("Failed to get story");
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let storyResult = "";
        while (true) {
          const { value, done } = await reader.read();
          const text = decoder.decode(value);
          storyResult += text;
          if (done) break;
        }
        dispatch({
          status: "finished converting photo to story",
          story: storyResult,
        });
      } catch (e) {
        console.error(e);
        return;
      }
    };
    if (status === "finished uploading photo to supabase") fetchStory();
  }, [status, imageUrl]);

  // This useEffect is for converting the story to sound captions
  useEffect(() => {
    const fetchCaption = async () => {
      const res = await fetch("/api/caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ story }),
      });
      if (!res.ok || !res.body) {
        throw new Error("Failed to get sound");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let captionResult = "";
      while (true) {
        const { value, done } = await reader.read();
        const text = decoder.decode(value);
        captionResult += text;
        if (done) break;
      }

      dispatch({
        status: "finish converting story to sound caption",
        caption: captionResult,
      });
    };
    if (status === "finished converting photo to story") fetchCaption();
  }, [status, story]);

  // This useEffect is for converting the actual sound captions into sound
  useEffect(() => {
    const generateSoundFromCaption = async () => {
      try {
        const { data, error } = await supabase.functions.invoke(
          "caption-to-sound",
          {
            body: { caption },
          },
        );

        if (error) {
          throw error;
        }
        if (!data) {
          throw new Error("Failed to get sound");
        }

        const sound = data.output;

        const res = await fetch(sound);
        const soundBlob = await res.blob();

        const audioName = `${await randomName()}.mp3`.replace("/", "");
        const { data: audioData, error: SoundUploadError } =
          await supabase.storage.from("audio").upload(audioName, soundBlob);
        if (SoundUploadError) {
          throw SoundUploadError;
        }
        const audio_url = `${storagePath}/audio/${audioData?.path}`;
        const { user } = await getCurrentUser();
        const { error: imageAudioError } = await supabase
          .from("image_audio")
          .insert([
            {
              image_url: imageUrl,
              audio_url,
              caption: story,
              user_id: user?.id || 1,
            },
          ]);

        if (imageAudioError) {
          throw imageAudioError;
        }

        t1Ref.current = performance.now();
        if (t1Ref.current && t0Ref.current) {
          const timeTaken = (t1Ref.current - t0Ref.current) / 1000;
          console.log("Time taken to generate sound: ", timeTaken);
        }
        dispatch({
          status: "show tap gesture one",
          audioUrl: audio_url,
        });
        const utterance = new SpeechSynthesisUtterance("Tap to listen");
        synth?.speak(utterance);
      } catch (e) {
        console.error(e);
      }
    };
    if (status === "finish converting story to sound caption")
      generateSoundFromCaption();
  }, [status, caption, imageUrl, story, synth]);

  return (
    <main className="mx-auto max-h-screen max-w-lg overflow-hidden px-2">
      <div className="relative flex items-center justify-center py-5">
        <BackButton />
        <h1 className="text-2xl font-bold">Photo</h1>
      </div>

      <div>
        <div className="relative h-[90vh] bg-muted" {...handler}>
          <Image
            src={photoBlobUrl}
            alt={story || "Image to be processed"}
            fill
            className={`h-full object-contain`}
          />
          {/* Transparent overlay div */}
          <div className="absolute left-0 top-0 h-full w-full bg-transparent"></div>

          {status == "show tap gesture one" && (
            <Gesture
              message="Tap to listen"
              gifName={`${isDark ? "D-Tap" : "L-Tap"}`}
            />
          )}
          {status == "show swipe right gesture two" && (
            <Gesture
              message="Swipe right to send to friends"
              gifName={`${isDark ? "D-SwipeRight" : "L-SwipeRight"}`}
            />
          )}

          {isProcessing && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-full w-full items-center justify-center bg-[#FEFFFF99] backdrop-blur dark:bg-[#00000091]">
                  <LoadSpinnerSVG />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl text-black dark:text-white">
                  Processing...
                </h1>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
