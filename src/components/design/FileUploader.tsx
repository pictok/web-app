"use client";

import { supabase } from "@/db/supabase";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import Logo from "./Logo";

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
    <section className="container px-5 py-2">
      <div className="mb-5 mt-3 flex justify-center">
        <Logo />
      </div>
      <div
        {...getRootProps({
          className:
            "dropzone border-dashed border-2 bg-white dark:border-2 dark:border-white/10 dark:bg-white/10 dark:text-white rounded-xl",
        })}
      >
        <input {...getInputProps()} />
        <p className="p-10">
          Upload your image here, or click to select an image from your device.
        </p>
      </div>
      {image && (
        <aside className="mt-10 space-y-5">
          <h2 className="text-3xl font-semibold">Preview</h2>
          <div className="flex justify-center">
            <img src={image} alt="preview" />
          </div>
          <div className="flex justify-center">
            <Button disabled={isUploading} onClick={handleUpload}>
              {isUploading ? "Uploading..." : "Upload image"}
            </Button>
          </div>
        </aside>
      )}
    </section>
  );
}
