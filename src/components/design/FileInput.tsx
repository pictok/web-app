import React from "react";

export default function FileInput() {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    if (selectedFile) {
      const data = new FormData();
      data.append("image", selectedFile);

      const response = await fetch("/api/saveImage", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (result.success) {
        console.log("Image saved successfully");
      } else {
        console.error(result.message);
      }
    }
  };

  return (
    <label className="cursor-pointer">
      Drop a file or click to upload
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
