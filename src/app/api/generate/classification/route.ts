import { classifyImage } from "@/lib/classifyImage";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  const output = await classifyImage(image);
  console.log(output);
  return NextResponse.json({ output });
}
