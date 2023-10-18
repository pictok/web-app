export async function getCaption(image: string) {
  return await fetch("/api/generate/classification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  });
}
