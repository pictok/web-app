// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import Replicate from "https://esm.sh/replicate@0.20.1";

const replicate = new Replicate({
  auth: Deno.env.get("REPLICATE_API_TOKEN"),
});

const model =
  "sepal/audiogen:154b3e5141493cb1b8cec976d9aa90f2b691137e39ad906d2421b74c2a8c52b8";

Deno.serve(async (req) => {
  const { caption } = await req.json();

  const input = {
    prompt: caption,
    duration: 3,
    top_k: 250,
    top_p: 0,
    temperature: 1,
    classifier_free_guidance: 3,
    output_format: "mp3",
  };

  const output = await replicate.run(model, { input });

  return new Response(JSON.stringify({ output }), {
    headers: { "Content-Type": "application/json" },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
