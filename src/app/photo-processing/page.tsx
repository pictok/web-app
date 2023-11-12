"use client";

import LoadSpinnerSVG from "@/components/icons/LoadSpinnerSVG";
import { ChevronLeft } from "lucide-react";

import { useEffect, useReducer, useRef, useState } from "react";
import supabase from "@/db/supabase";
import Link from "next/link";
import Image from "next/image";

import { getCaption } from "@/lib/getCaption";
import { formatCaption } from "@/lib/formatCaption";
import { readCaption } from "@/lib/readCaption";
import { getSound } from "@/lib/getSound";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import { randomName } from "@/lib/randomImageName";
import Gesture from "@/components/design/Gesture";
import { speak } from "@/lib/speak";
import { useTheme } from "next-themes";

type ReducerState = {
  status:
    | "processing photo"
    | "show tap gesture one"
    | "show swipe right gesture two"
    | "finished processing";
  caption: string;
};

type ReducerAction =
  | {
      type: "processing_photo";
      status: "processing photo";
    }
  | {
      type: "gesture_one";
      status: "show tap gesture one";
      caption: string;
    }
  | {
      type: "gesture_two";
      status: "show swipe right gesture two";
    }
  | {
      type: "finished_processing";
      status: "finished processing";
    };

const initialState: ReducerState = {
  status: "processing photo",
  caption: "",
};

const photoProcessingReducer = (
  state: ReducerState,
  action: ReducerAction,
): ReducerState => {
  switch (action.type) {
    case "processing_photo":
      return { ...state, status: action.status };

    case "gesture_one":
      return {
        ...state,
        status: action.status,
        caption: action.caption,
      };

    case "gesture_two":
      return { ...state, status: action.status };

    case "finished_processing":
      return { ...state, status: action.status };

    default:
      return state;
  }
};

export default function PhotoProcessing({
  searchParams: { photoBlobUrl },
}: {
  searchParams: { photoBlobUrl: string };
}) {
  const router = useRouter();
  const theme = useTheme();
  const [state, dispatch] = useReducer(photoProcessingReducer, initialState);
  const { status, caption } = state;
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const handler = useSwipeable({
    onSwipedRight: () => {
      if (status == "finished processing") router.push("/friends");
    },
    onTap: () => {
      if (
        status == "processing photo" ||
        status == "show swipe right gesture two"
      )
        return;
      window.speechSynthesis.cancel();
      speak(caption, async () => {
        await audioRef.current.play();
        audioRef.current.onended = () => {
          if (status == "show tap gesture one") {
            dispatch({
              type: "gesture_two",
              status: "show swipe right gesture two",
            });
            speak("Swipe right to send to friends", () => {
              dispatch({
                type: "finished_processing",
                status: "finished processing",
              });
            });
          }
        };
      });
    },
    trackMouse: true,
  });

  useEffect(() => {
    const handleConversionToSound = async () => {
      speak("Image processing is in progress. Please wait.");
      // // wait 3 seconds
      // const response = await fetch(photoBlobUrl);
      // // Blob object
      // const blobData = await response.blob();
      // //Generate a random image name that will be used
      // // to store the image in supabase storage
      // const imageName =
      //   (await randomName()) + blobData.type.replace("image/", ".");
      // //Save the photo to supabase storage
      // const { data, error: imageUploadError } = await supabase.storage
      //   .from("images")
      //   // We can upload imageName using either a Blob object or a File object
      //   .upload(imageName, blobData);
      // if (imageUploadError) {
      //   throw imageUploadError;
      // }
      // //Get the photo url string
      // const photoString = data?.path;
      // console.log({ photoString });
      // //Get the photo public url
      // const {
      //   data: { publicUrl: photoPublicUrl },
      // } = await supabase.storage.from("images").getPublicUrl(photoString);
      // // get caption from photo public url
      // const res = await getCaption(photoPublicUrl);
      // const captionData: { output: string } = await res.json();
      // const caption = formatCaption(String(captionData.output));

      // // get sound from caption
      // const { output: sound } = await getSound(caption);
      // // upload sound to supabase storage
      // const res2 = await fetch(sound);
      // const soundBlob = await res2.blob();
      // const audioName = `${await randomName()}.mp3`.replace("/", "");
      // const { error: SoundUploadError } = await supabase.storage
      //   .from("audio")
      //   .upload(audioName, soundBlob);
      // if (SoundUploadError) {
      //   throw SoundUploadError;
      // }
      // wait 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));
      dispatch({
        type: "gesture_one",
        status: "show tap gesture one",
        caption: "A little Scotty boy",
      });
      audioRef.current.src = "/sound/sample.mp3";
      speak("Tap to listen");
    };
    handleConversionToSound();
    return () => {
      // This function will be called when the component is unmounted
      window.speechSynthesis.cancel();
    };
  }, [photoBlobUrl]);

  return (
    <main className="mx-auto max-h-screen max-w-lg overflow-hidden px-2">
      <div className="relative flex items-center justify-center py-5">
        <Link href="/" className="absolute left-2">
          <ChevronLeft aria-label="Go back" />
        </Link>
        <h1 className="text-2xl font-bold">Photo</h1>
      </div>

      <div>
        <div className="relative h-[90vh] bg-muted" {...handler}>
          <Image
            src={photoBlobUrl}
            alt={caption || "Image to be processed"}
            fill
            className={`h-full object-contain`}
          />
          {status == "show tap gesture one" &&
            (theme.theme == "dark" ? (
              <Gesture message="Tap to listen" gifName="D-Tap" />
            ) : (
              <Gesture message="Tap to listen" gifName="L-Tap" />
            ))}
          {status == "show swipe right gesture two" &&
            (theme.theme == "dark" ? (
              <Gesture
                message="Swipe right to send to friends"
                gifName="D-SwipeRight"
              />
            ) : (
              <Gesture
                message="Swipe right to send to friends"
                gifName="L-SwipeRight"
              />
            ))}
          {status == "processing photo" && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-full w-full items-center justify-center bg-[#FEFFFF99] backdrop-blur dark:bg-[#00000091]">
                  <LoadSpinnerSVG />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl text-black dark:text-white">
                  Processing
                </h1>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
