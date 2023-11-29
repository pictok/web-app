"use client";

import CameraIcon from "../icons/CameraIcon";
import IconButton from "./PrimaryIconButton";

export default function CameraNavItem() {
  return (
    <IconButton className="flex h-20 w-20 items-center justify-center bg-transparent hover:bg-transparent dark:bg-transparent">
      <CameraIcon />
    </IconButton>
  );
}
