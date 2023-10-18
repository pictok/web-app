"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CameraComponent() {
  const [image, setImage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          //attach the stream to the video tag
          videoRef.current.srcObject = stream;
          videoRef.current.play();
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

    if (videoRef.current && canvasRef.current) {
      console.log("Take photo");
      // set the photo width and height
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      let context = canvasRef.current.getContext("2d"); //image doesn't have getContext(), use canvas
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        // convert canvasRef.current to image in png
        const data = canvasRef.current.toDataURL("image/png");
        setImage(data);
        console.log("photos");
      }
    }
  };

  useEffect(() => {
    getUserCamera();
  }, []);

  return (
    <>
      <div className="mb-4 h-full w-full">
        <video ref={videoRef} id="video" className="h-full w-full shadow">
          Video stream not available.
        </video>
        <button
          id="startbutton"
          className="bg-grey-100 border-grey-500 text-grey-200 mx-auto mt-2 block rounded-full border px-4 py-2 text-sm shadow"
          onClick={takePicture}
        >
          Take photo
        </button>
      </div>

      {image && <h4>Preview</h4>}
      <canvas ref={canvasRef} id="canvas" className=""></canvas>
      {image && (
        <>
          {" "}
          <button className="mr-10 rounded-xl bg-blue-500 p-3 text-white">
            Upload photo
          </button>
          <button
            className="rounded-xl bg-blue-500 p-3 text-white"
            onClick={takePicture}
          >
            Retake
          </button>
        </>
      )}
    </>
  );
}
