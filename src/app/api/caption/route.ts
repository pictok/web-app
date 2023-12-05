import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { story } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      max_tokens: 100,
      temperature: 0.7,
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are an AI trained to identify the crucial keywords from a story. Your task is to describe the sounds that these keywords might have in real life. Combine these keywords and their corresponding sounds into a single sentence in the format ‘Keyword (Sound)’, where ‘Sound’ should be an onomatopoeic representation of the sound that the keyword makes.",
        },
        { role: "user", content: story },
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
