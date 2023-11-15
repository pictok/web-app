import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest, res: NextResponse) {
  const { image } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 300,

    messages: [
      {
        role: "user",
        //@ts-ignore
        content: [
          {
            type: "text",
            text: "Describe what's in the image in detail but keep it concise in one sentence.",
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
    data: response.choices[0].message.content,
  });
}
