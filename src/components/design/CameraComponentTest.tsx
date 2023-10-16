"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function CameraComponentTest() {
  //   let video: HTMLVideoElement | null = null;
  //   let canvas: HTMLCanvasElement | null = null;
  //   let photo: HTMLImageElement | null = null;
  //   let startbutton: HTMLButtonElement | null = null;

  const videoRef = useRef<HTMLVideoElement>(null);
  //   const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  //   const startbuttonRef = useRef<HTMLButtonElement>(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        let video = videoRef.current;

        if (video) {
          //attach the stream to the video tag
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });
  };
  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  return (
    <div className="mx-auto max-w-xl p-8 font-sans text-base">
      <h2 className="mb-4 text-2xl font-bold">
        navigator.mediaDevices.getUserMedia() take photo demo
      </h2>
      <div className="mb-4">
        <video
          ref={videoRef}
          id="video"
          className="h-60 w-80 border border-black shadow"

        >
          Video stream not available.
        </video>
        <button
          id="startbutton"
          className="mx-auto mt-2 block border border-white bg-green-500 px-4 py-2 text-sm text-white shadow"
        >
          Take photo
        </button>
      </div>
      {/* <div className="mb-4">
          <Image
            id="photo"
            ref={photoRef}
            src=""
            alt="The screen capture will appear in this box."
            className="border border-black shadow"
            width={320}
            height={240}
          />
        </div> */}
    </div>
  );
}
