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
            text: "Please identify all objects, discern the gender of any person present, recognize weather conditions, pinpoint the location if identifiable, and describe any observable motion within the image. Condense findings into a single, succinct sentence, avoiding the use of 'This image shows.'",
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
