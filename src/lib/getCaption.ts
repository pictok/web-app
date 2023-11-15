const KEY = process.env.OPENAI_API_KEY;

export async function getCaption(image: string) {
  return await fetch("/api/generate/classifyWithVision", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({ image }),
  });
}
