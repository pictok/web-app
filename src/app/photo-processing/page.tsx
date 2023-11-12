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
import { randomName } from "@/lib/randomImageName";
import Gesture from "@/components/design/Gesture";
import { speak } from "@/lib/speak";

type ReducerState = {
  status:
    | "processing photo"
    | "show tap gesture one"
    | "show swipe right gesture two"
    | "finished processing";
  caption: string;
  sound: string;
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
      sound: string;
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
  sound: "",
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
        sound: action.sound,
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
  const [state, dispatch] = useReducer(photoProcessingReducer, initialState);
  const { status, caption, sound } = state;
  // const [sound, setSound] = useState("");
  // const [isConverting, setIsConverting] = useState(false);
  // const [shareUrl, setShareUrl] = useState("");
  // const [caption, setCaption] = useState("");
  // const [tapTutorialOn, setTapTutorialOn] = useState(true);
  // const [swipeRightTutorialOn, setSwipeRightTutorialOn] = useState(true);

  const handler = useSwipeable({
    onSwipedRight: handleSwipeRight,
    onTap: handleTap,
    trackMouse: true,
  });

  async function handleTap() {
    if (
      status == "processing photo" ||
      status == "show swipe right gesture two"
    )
      return;
    const audio = new Audio(sound);
    speak(caption, () => {
      audio.play();
    });
    audio.play();
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
  }

  async function handleSwipeRight() {
    if (status == "finished processing") router.push("/friends");
  }

  useEffect(() => {
    const handleConversionToSound = async () => {
      speak("Image processing is in progress. Please wait.");
      // wait 3 seconds
      const response = await fetch(photoBlobUrl);
      // Blob object
      const blobData = await response.blob();
      //Generate a random image name that will be used
      // to store the image in supabase storage
      const imageName =
        (await randomName()) + blobData.type.replace("image/", ".");
      //Save the photo to supabase storage
      const { data, error: imageUploadError } = await supabase.storage
        .from("images")
        // We can upload imageName using either a Blob object or a File object
        .upload(imageName, blobData);
      if (imageUploadError) {
        throw imageUploadError;
      }
      //Get the photo url string
      const photoString = data?.path;
      console.log({ photoString });
      //Get the photo public url
      const {
        data: { publicUrl: photoPublicUrl },
      } = await supabase.storage.from("images").getPublicUrl(photoString);
      // get caption from photo public url
      const res = await getCaption(photoPublicUrl);
      const captionData: { output: string } = await res.json();
      const caption = formatCaption(String(captionData.output));

      // get sound from caption
      const { output: sound } = await getSound(caption);
      // upload sound to supabase storage
      const res2 = await fetch(sound);
      const soundBlob = await res2.blob();
      const audioName = `${await randomName()}.mp3`.replace("/", "");
      const { error: SoundUploadError } = await supabase.storage
        .from("audio")
        .upload(audioName, soundBlob);
      if (SoundUploadError) {
        throw SoundUploadError;
      }
      dispatch({
        type: "gesture_one",
        status: "show tap gesture one",
        caption,
        sound,
      });
      speak("Tap to listen");
    };
    handleConversionToSound();
    return () => {
      // This function will be called when the component is unmounted
      window.speechSynthesis.cancel();
    };
  }, [photoBlobUrl]);

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
        <div className="relative h-[90vh] bg-muted" {...handler}>
          <Image
            src={photoBlobUrl}
            // src="/images/photos/photo-1.jpg"
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
