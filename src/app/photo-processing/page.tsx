"use client";

import LoadSpinnerSVG from "@/components/icons/LoadSpinnerSVG";
import { ChevronLeft } from "lucide-react";

import { useEffect, useReducer, useState } from "react";
import supabase from "@/db/supabase";
import Link from "next/link";
import Image from "next/image";

import { getCaption } from "@/lib/getCaption";
import { formatCaption } from "@/lib/formatCaption";
import { readCaption } from "@/lib/readCaption";
import { getSound } from "@/lib/getSound";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import { randomImageName } from "@/lib/randomImageName";
import Gesture from "@/components/design/Gesture";

type ReducerState = {
  status:
    | "processing photo"
    | "show tap gesture one"
    | "show swipe right gesture two";
};
type ReducerAction =
  | {
      type: "processing_photo";
      status: "processing photo";
    }
  | {
      type: "gesture_one";
      status: "show tap gesture one";
    }
  | {
      type: "gesture_two";
      status: "show swipe right gesture two";
    };

const initialState: ReducerState = {
  status: "processing photo",
};

const photoProcessingReducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case "processing_photo":
      return { ...state, status: action.status };

    case "gesture_one":
      return { ...state, status: action.status };

    case "gesture_two":
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
  const [state, dispatch] = useReducer(photoProcessingReducer, initialState);
  const { status } = state;
  // const [sound, setSound] = useState("");
  // const [isConverting, setIsConverting] = useState(false);
  // const [shareUrl, setShareUrl] = useState("");
  // const [caption, setCaption] = useState("");
  // const [tapTutorialOn, setTapTutorialOn] = useState(true);
  // const [swipeRightTutorialOn, setSwipeRightTutorialOn] = useState(true);

  // const handler = useSwipeable({
  //   onSwipedRight: handleSwipeRight,
  //   onTap: handleTap,
  //   trackMouse: true,
  // });

  // async function handleTap() {
  //   // turn off tap tutorial once user taps and turn on swipe right tutorial
  //   if (!isConverting && tapTutorialOn) {
  //     if ("speechSynthesis" in window) {
  //       await readCaption(caption);
  //       // play audio
  //       const audio = new Audio(sound);
  //       await audio.play();
  //       audio.onended = async () => {
  //         const speech = new SpeechSynthesisUtterance();
  //         speech.text = "Swipe right to send to friends";

  //         window.speechSynthesis.speak(speech);
  //         speech.onend = () => {
  //           setSwipeRightTutorialOn(false);
  //         };
  //       };
  //     } else {
  //       console.error("SpeechSynthesis is not supported in this browser.");
  //     }
  //     setTapTutorialOn(false);
  //   } else if (!isConverting && !tapTutorialOn) {
  //     if ("speechSynthesis" in window) {
  //       await readCaption(caption);
  //       // play audio
  //       const audio = new Audio(sound);
  //       await audio.play();
  //     } else {
  //       console.error("SpeechSynthesis is not supported in this browser.");
  //     }
  //   }
  // }

  // async function handleSwipeRight() {
  //   // prevents swipe right from working when tap tutorial is on
  //   if (!isConverting && tapTutorialOn) return;
  //   // turn off swipe right tutorial once user swipes right
  //   if (!isConverting && swipeRightTutorialOn) {
  //     setSwipeRightTutorialOn(false);
  //   } else if (!isConverting) {
  //     router.push("/friends");
  //   }
  // }

  useEffect(() => {
    const handleConversionToSound = async () => {
      // wait 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dispatch({
        type: "gesture_one",
        status: "show tap gesture one",
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dispatch({
        type: "gesture_two",
        status: "show swipe right gesture two",
      });
    };
    handleConversionToSound();
  }, []);

  // useEffect(() => {
  //   const handleConversionToSound = async () => {
  //     setIsConverting(true);
  //     await readCaption("Image processing is in progress. Please wait.");
  //     const response = await fetch(photoBlobUrl);
  //     // Blob object
  //     const blobData = await response.blob();

  //     //Generate a random image name that will be used
  //     // to store the image in supabase storage
  //     const imageName =
  //       (await randomImageName()) + blobData.type.replace("image/", ".");

  //     // Save the photo to supabase storage
  //     const { data, error } = await supabase.storage
  //       .from("images")
  //       // We can upload imageName using either a Blob object or a File object
  //       .upload(imageName, blobData);
  //     if (error) {
  //       console.error(error);
  //       return;
  //     }

  //     //Get the photo url string
  //     const photoString = data?.path;
  //     console.log(photoString);

  //     //Get the photo public url
  //     const {
  //       data: { publicUrl: photoPublicUrl },
  //     } = await supabase.storage.from("images").getPublicUrl(photoString);

  //     // get caption from photo public url
  //     const res1 = await getCaption(photoPublicUrl);
  //     const captionData = await res1.json();
  //     const caption = formatCaption(String(captionData.output));
  //     setCaption(caption);

  //     //use speech to text web api to read caption to the user
  //     // "speechSynthesis" in window
  //     //   ? await readCaption(caption)
  //     //   : console.error("SpeechSynthesis is not supported in this browser.");

  //     // get sound from caption
  //     const { output } = await getSound(caption);

  //     setSound(() => output);

  //     // upload sound to supabase storage
  //     const res3 = await fetch(output);
  //     const blob = await res3.blob();
  //     const audioName = `${await randomImageName()}.mp3`.replace("/", "");
  //     const { error: SoundUploadError } = await supabase.storage
  //       .from("audio")
  //       .upload(audioName, blob);
  //     if (SoundUploadError) console.log(SoundUploadError);

  //     // insert image and audio url to supabase
  //     const audioPath =
  //       "https://bmtbohuzvkdifffdwayv.supabase.co/storage/v1/object/public/audio/";

  //     const { data: result, error: CreateImgAudioLinkError } = await supabase
  //       .from("image_audio")
  //       .insert([
  //         {
  //           image_url: photoPublicUrl,
  //           audio_url: audioPath + audioName,
  //           caption,
  //         },
  //       ])
  //       .select()
  //       .single();
  //     if (CreateImgAudioLinkError) console.log(CreateImgAudioLinkError);
  //     if (result) {
  //       "speechSynthesis" in window
  //         ? await readCaption("Image processing is complete. Tap to listen.")
  //         : console.error("SpeechSynthesis is not supported in this browser.");

  //       setShareUrl(`${location.origin}/photo/${result.share_id}`);
  //       setIsConverting(false);
  //       // const audio = new Audio(output);
  //       // await audio.play();
  //     }
  //   };
  //   handleConversionToSound();
  //   return () => {
  //     window.speechSynthesis.cancel();
  //   };
  // }, [photoBlobUrl]);

  return (
    <main className="mx-auto max-h-screen max-w-lg overflow-hidden px-2">
      <div className="relative flex items-center justify-center py-5">
        <Link href="/" className="absolute left-2">
          <ChevronLeft aria-label="Go back" />
        </Link>
        <h1 className="text-2xl font-bold">Photo</h1>
      </div>

      <div>
        <div className="relative h-[90vh]">
          <Image
            // src={photoBlobUrl}
            src="/images/photos/photo-1.jpg"
            alt="Palm trees on a beach"
            fill
            className={`h-full object-contain`}
          />
          {status == "show tap gesture one" && (
            <Gesture message="Tap to listen" gifName="L-Tap" />
          )}
          {status == "show swipe right gesture two" && (
            <Gesture
              message="Swipe right to send to friends"
              gifName="L-SwipeRight"
            />
          )}
        </div>
        {status == "processing photo" && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-full w-full items-center justify-center bg-[#FEFFFF99] backdrop-blur">
                <LoadSpinnerSVG />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl text-black">Processing</h1>
            </div>
          </>
        )}
      </div>

      {/* <div className="relative h-[90vh]" {...handler}>
        <div className="relative h-[90vh]">
          <Image
            src={photoBlobUrl}
            alt="Palm trees on a beach"
            fill
            className={`h-full object-contain ${
              isConverting ? "opacity-70" : ""
            }`}
          />
          {!isConverting && tapTutorialOn ? (
            <Gesture message="Tap to listen" gifName="L-Tap" />
          ) : !isConverting && swipeRightTutorialOn ? (
            <Gesture
              message="Swipe right to send to friends"
              gifName="L-SwipeRight"
            />
          ) : (
            ""
          )}
        </div>
        {isConverting && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-full w-full items-center justify-center bg-[#FEFFFF99] backdrop-blur">
                <LoadSpinnerSVG />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl text-black">Processing</h1>
            </div>
          </>
        )}
      </div> */}
    </main>
  );
}
