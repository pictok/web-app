"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

export default function TakePhotoButton() {
  const router = useRouter();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const handleClick = async () => {
    //Open the camera
    photoInputRef.current?.click();
  };

  const handlePhotoInput = async () => {
    //Get the photo
    const files = photoInputRef.current?.files;
    if (!files || files.length == 0) return;
    const photo = files[0];
    const photoBlobUrl = URL.createObjectURL(photo);
    router.push(`/photo-processing?photoBlobUrl=${photoBlobUrl}`);
  };
  return (
    <>
      <PrimaryButton
        onClick={handleClick}
        className="relative flex h-auto w-full  max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10"
      >
        <h2 className="text-lg">Take Photo</h2>
        <div
          aria-hidden
          className="relative z-10 ml-auto mt-auto h-16 w-16 overflow-hidden"
        >
          <Image
            aria-hidden
            src="/images/assets/Camera.png"
            fill={true}
            alt="Camera icon"
          />
        </div>
        <div
          aria-hidden
          className="weird-circle absolute bottom-0 right-0 h-[100px] w-[100px] overflow-hidden rounded-br-3xl bg-primary-variant"
        ></div>
      </PrimaryButton>

      <input
        ref={photoInputRef}
        onChange={handlePhotoInput}
        type="file"
        name="picture"
        id="picture"
        accept="image/*"
        capture="environment"
        className="hidden"
        aria-hidden
      />
    </>
  );
}
