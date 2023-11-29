"use client";

import { useRouter } from "next/navigation";
import CameraIcon from "../icons/CameraIcon";
import IconButton from "./PrimaryIconButton";
import { useRef } from "react";

export default function CameraNavItem() {
  const { push } = useRouter();
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
    const params = new URLSearchParams();
    params.set("photoBlobUrl", photoBlobUrl);
    push(`/photo-processing?${params.toString()}`);
  };
  return (
    <IconButton
      onClick={handleClick}
      className="flex h-20 w-20 items-center justify-center bg-transparent hover:bg-transparent dark:bg-transparent"
    >
      <CameraIcon />
      <input
        ref={photoInputRef}
        onChange={handlePhotoInput}
        type="file"
        name="picture"
        id="picture"
        accept="image/png, image/jpeg"
        capture="environment"
        className="hidden"
        aria-hidden
      />
    </IconButton>
  );
}
