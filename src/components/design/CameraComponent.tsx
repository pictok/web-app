"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CameraComponent() {
  let video: HTMLVideoElement | null = null;
  let canvas: HTMLCanvasElement | null = null;
  let photo: HTMLImageElement | null = null;
  //   let startbutton: HTMLButtonElement | null = null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  //take picture of user
  const takePicture = () => {
    //width and height
    let width = 494;
    let height = 370;

    video = videoRef.current;
    canvas = canvasRef.current;
    photo = photoRef.current;

    if (canvas && video && photo) {
      //set the photo width and height
      canvas.width = width;
      canvas.height = height;

      let context = canvas.getContext("2d"); //image doesn't have getContext(), use canvas
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // convert canvas to image in png
        const data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
        photo.setAttribute("width", String(width));
        photo.setAttribute("height", String(height));
        //! next: save picture to local?? then send to image to sound processor?
      }
    }
  };

  // clear photo
  function clearphoto() {
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const data = canvas.toDataURL("image/png");
        if (photo) {
          photo.setAttribute("src", data);
        }
      }
    }
  }

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  return (
    <>
      <div className="mb-4 h-full w-full">
        <video
          ref={videoRef}
          id="video"
          className="h-full w-full border border-black shadow"
        >
          Video stream not available.
        </video>
        <Link href="/">Cancel</Link>
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
      <div className="mb-4 h-auto w-auto">
        <canvas ref={canvasRef} id="canvas" className="hidden"></canvas>
        <div className="h-full w-full">
          <Image
            id="photo"
            ref={photoRef}
            src=""
            alt="The screen capture will appear in this box."
            className="border border-black shadow"
          />
        </div>
      </div>
    </>
  );
}
