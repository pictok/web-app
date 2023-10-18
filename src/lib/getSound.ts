export async function getSound(caption: string) {
  return await fetch("/api/generate/sound", {
    method: "POST",
    body: JSON.stringify({ caption }),
  });
}
