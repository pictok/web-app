export async function getSound(caption: string) {
  return await fetch(
    "https://tjv5dlrj1a.execute-api.us-west-2.amazonaws.com/default/pictok-text-to-sound",
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ caption }),
    },
  );
}
