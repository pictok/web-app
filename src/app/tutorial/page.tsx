"use client";
import BackButton from "@/components/design/BackButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function TutorialPage() {
  // State to mange if the video has played
  const [hasPlayed, setHasPlayed] = useState(false);

  const router = useRouter();

  // handle for when the video has ends
  const handleVideoEnd = () => {
    // Use the router if it's available
    setHasPlayed(true);
    router.push("/");
  };

  return (
    <main className="mx-auto flex max-h-screen max-w-lg flex-col justify-between px-5">
      <div>
        <div className="relative flex items-center justify-center py-5">
          <BackButton />
          <h1 className="text-3xl font-bold">Tutorial</h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-lg">
        <AspectRatio ratio={16 / 9}>
          <video
            src="/video/Tutorial.mp4"
            className="w-full rounded-lg object-cover"
            autoPlay={!hasPlayed} // Autoplay only if it hasnt played yet
            controls
            onEnded={handleVideoEnd} // Call handleVideoEnd when the video ends
          >
            Your browser does not support the video
          </video>
        </AspectRatio>
      </div>
    </main>
  );
}
