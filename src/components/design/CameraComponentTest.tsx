"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function CameraComponentTest() {
  let video: HTMLVideoElement | null = null;
  let canvas: HTMLCanvasElement | null = null;
  //   let photo: HTMLImageElement | null = null;
  //   let startbutton: HTMLButtonElement | null = null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //   const photoRef = useRef<HTMLImageElement>(null);
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

  //take picture of user
  const takePicture = () => {
    //width and height
    let width = 320;
    let height = 240;

    canvas = canvasRef.current;
    video = videoRef.current;

    if (canvas && video) {
      //set the photo width and height
      canvas.width = width;
      canvas.height = height;

      let ctx = canvas.getContext("2d"); //image doesn't have getContext()
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    }
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  //save picture to local??

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Webcam take photo demo</h2>
      <div className="mb-4 h-full w-full">
        <video
          ref={videoRef}
          id="video"
          className="h-full w-full border border-black shadow"
        >
          Video stream not available.
        </video>
        <button
          id="startbutton"
          className="bg-grey-100 border-grey-500 text-grey-200 mx-auto mt-2 block rounded-full border px-4 py-2 text-sm shadow"
          onClick={takePicture}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            <span>Take photo</span>
          </svg>
        </button>
      </div>
      <div className="mb-4 h-full w-full">
        <canvas
          ref={canvasRef}
          id="photo"
          className="h-full w-full border border-black shadow"
          width={320}
          height={240}
        ></canvas>
      </div>
    </>
  );
}
