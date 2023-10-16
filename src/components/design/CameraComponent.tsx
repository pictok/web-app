"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function CameraComponent() {
  let video: HTMLVideoElement | null = null;
  let canvas: HTMLCanvasElement | null = null;
  let photo: HTMLImageElement | null = null;
  let startbutton: HTMLButtonElement | null = null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const startbuttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    (() => {
      // the height will be calculated based on the aspect ratio of the input stream.
      const width = 320; // photo width
      let height = 0; // photo height

      let streaming = false;

      function showViewLiveResultButton() {
        if (typeof window !== "undefined" && window.self !== window.top) {
          // Ensure that if our document is in a frame, we get the user
          // to first open it in its own tab or window. Otherwise, it
          // won't be able to request permission for camera access.
          document.querySelector(".contentarea")?.remove();
          const button = document.createElement("button");
          button.textContent = "View live result of the example code above";
          document.body.append(button);
          button.addEventListener("click", () => window.open(location.href));
          return true;
        }
        return false;
      }

      function startup() {
        if (showViewLiveResultButton()) {
          return;
        }

        video = videoRef.current;
        canvas = canvasRef.current;
        photo = photoRef.current;
        startbutton = startbuttonRef.current;

        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            if (video) {
              video.srcObject = stream;
              video.play();
            }
          })
          .catch((err) => {
            console.error(`An error occurred: ${err}`);
          });

        if (video) {
          video.addEventListener(
            "canplay",
            (ev) => {
              if (!streaming) {
                if (video) {
                  let height = video.videoHeight / (video.videoWidth / width);

                  // Firefox currently has a bug where the height can't be read from
                  // the video, so we will make assumptions if this happens.
                  if (isNaN(height)) {
                    height = width / (4 / 3);
                  }

                  video.setAttribute("width", width.toString());
                  video.setAttribute("height", height.toString());
                }
                if (canvas) {
                  canvas.setAttribute("width", width.toString());
                  canvas.setAttribute("height", height.toString());
                }

                streaming = true;
              }
            },
            false,
          );
        }

        if (startbutton) {
          startbutton.addEventListener(
            "click",
            (ev) => {
              takepicture();
              ev.preventDefault();
            },
            false,
          );
        }

        clearphoto();
      }

      // Fill the photo with an indication that none has been
      // captured.

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

      // Capture a photo by fetching the current contents of the video
      // and drawing it into a canvas, then converting that to a PNG
      // format data URL. By drawing it on an offscreen canvas and then
      // drawing that to the screen, we can change its size and/or apply
      // other changes before drawing it.

      function takepicture() {
        if (width && height && canvas && video && photo) {
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(video, 0, 0, width, height);

            const data = canvas.toDataURL("image/png");
            photo.setAttribute("src", data);
          }
        } else {
          clearphoto();
        }
      }

      // Set up our event listener to run the startup process
      // once loading is complete.
      window.addEventListener("load", startup, false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-xl p-8 font-sans text-base">
      <h1 className="mb-4 text-2xl font-bold">
        MDN - navigator.mediaDevices.getUserMedia() take photo demo
      </h1>
      <div className="mb-4">
        <video
          ref={videoRef}
          id="video"
          className="h-60 w-80 border border-black shadow"
          autoPlay
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
      <canvas ref={canvasRef} id="canvas" className="hidden"></canvas>
      <div className="mb-4">
        <Image
          id="photo"
          ref={photoRef}
          src=""
          alt="The screen capture will appear in this box."
          className="border border-black shadow"
          width={320}
          height={240}
        />
      </div>
    </div>
  );
}
