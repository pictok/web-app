"use client";

import { supabase } from "@/db/supabase";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setImage(url);
      setFile(file);
    });
  }, []);

  const handleUpload = async () => {
    setIsUploading(true);
    const imagePath =
      "https://bmtbohuzvkdifffdwayv.supabase.co/storage/v1/object/public/images/";
    const imageName = `${Math.random()}-${file?.name}`.replace("/", "");

    if (!imageName) return;
    if (!file) return;

    const { error: StorageError } = await supabase.storage
      .from("images")
      .upload(imageName, file);

    if (StorageError) console.log(StorageError);

    setIsUploading(false);
    router.push(`/upload/success?image=${imagePath}${imageName}`);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  return (
    <section className="container p-10">
      <div
        {...getRootProps({
          className: "dropzone border-dashed border bg-gray-100 text-gray-500",
        })}
      >
        <input {...getInputProps()} />
        <p className="p-10">
          Drag n drop some files here, or click to select files
        </p>
      </div>
      {image && (
        <aside className="mt-10 space-y-5">
          <h4>Preview</h4>
          <img src={image} alt="preview" />
          <div className="flex justify-center">
            <button
              disabled={isUploading}
              onClick={handleUpload}
              className={
                " text-white p-5 rounded-xl " +
                (isUploading
                  ? "bg-gray-600 opacity-50 cursor-not-allowed"
                  : "bg-blue-500")
              }
            >
              {isUploading ? "Uploading..." : "Upload image"}
            </button>
          </div>
        </aside>
      )}
    </section>
  );
}
