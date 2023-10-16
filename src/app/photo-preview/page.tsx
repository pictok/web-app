import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PhotoPreviewProps {
  imageData: string;
}

export default function PhotoPreview({ imageData }: PhotoPreviewProps) {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Photo Preview</h2>
      <Image src={imageData} alt="Captured Photo" width={494} height={370} />
      {/* {processing photo here} */}
      <Link href="/webcameraTest">
        <a className="mt-4 block text-blue-500">Retake Photo</a>
      </Link>
    </>
  );
}
