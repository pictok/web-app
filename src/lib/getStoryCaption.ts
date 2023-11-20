export async function getStoryCaption(image: string) {
  return await fetch("/api/generate/storyAndCaption", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  });
}
