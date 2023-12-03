import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 400,
      stream: true,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "You are an AI trained to describe images in a simple yet detailed manner, suitable for a first grader. Upon receiving an image, your task is to create a story about the image within 60 words. Remember to focus on the key elements in the image and describe them in a way that a first grader and visually impaired individuals would understand. ",
            },
            {
              type: "image_url",
              image_url: imageUrl, // base64 images
            },
          ],
        },
      ],
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
