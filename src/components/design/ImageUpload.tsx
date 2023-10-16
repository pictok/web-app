import React from "react";

export default function ImageUpload() {
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      console.log("Image uploaded successfully");
    } else {
      console.error("Error uploading image", data.error);
    }
  }

  return (
    <label className="cursor-pointer">
      Drop a file or click to upload yohhh
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}
