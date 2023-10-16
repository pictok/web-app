import React from "react";
import { useState } from "react";

export default function ImageUpload() {
  const [imageFile, setimageFile] = useState<File>();

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    setimageFile(selectedFile);
  };

  // const saveImageHandler = async () => {
  //   const imageData = new FormData();
  //   imageData.append("image", imageFile);
  //   try {
  //     const response = await fetch("/api/saveImage", {
  //       method: "POST",
  //       body: imageData,
  //     });

  //     const data = await response.json();
  //     if (!data.ok) {
  //       console.log("Image saved successfully");
  //     }
  //     setimageFile(null);
  //   } catch (error) {
  //     console.log(error);
  //   }

    return (
      <label className="cursor-pointer">
        Drop a file or click to upload yohhh
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={imageChangeHandler}
          className="hidden"
        />
      </label>
    );
  };

