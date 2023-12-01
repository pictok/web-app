import BackButton from "@/components/design/BackButton";
import Navbar from "@/components/design/Navbar";
import React from "react";

export default function TutorialPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-between px-5">
      <div>
        <div className="relative flex items-center justify-center py-5">
          <BackButton />
          <h1 className="text-3xl font-bold">Tutorial</h1>
        </div>
      </div>
      <div>
        <video
          src="/video/Tutorial.mp4"
          className="mb-4 max-h-[calc(100vh-8rem)] w-full rounded-lg object-cover"
          autoPlay
          controls
        >
          Your browser does not support the video
        </video>
      </div>
      <div className="mb-5">
        <Navbar />
      </div>
      <div>
        <h1>Test</h1>
      </div>
    </main>
  );
}
