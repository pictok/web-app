import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function PhotoPreview() {
  const router = useRouter();
  const { imageData } = router.query;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Photo Preview</h2>
      {imageData && (
        <Image
          src={imageData as string}
          alt="Preview"
          width={500}
          height={500}
        />
      )}
    </div>
  );
}
