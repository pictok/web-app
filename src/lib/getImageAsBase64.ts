export async function getImageAsBase64(blobData: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blobData);

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert Blob to base64"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error reading Blob as base64"));
    };
  });
}
