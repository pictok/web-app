import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const { image } = await req.json();

  //@ generating a narrative story
  const storyResponse = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 400,

    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Generate a short narrative story in 70 words based on the provided image.",
          },
          {
            type: "image_url",
            image_url: image, // base64 images
          },
        ],
      },
    ],
  });

  //@ generating a concise one-sentence caption
  const captionResponse = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 40,

    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Provide a concise one-sentence caption describing what's in the image.",
          },
          {
            type: "image_url",
            image_url: image, // base64 images
          },
        ],
      },
    ],
  });

  return NextResponse.json({
    narrativeStory: storyResponse.choices[0].message.content,
    caption: captionResponse.choices[0].message.content,
  });
}
