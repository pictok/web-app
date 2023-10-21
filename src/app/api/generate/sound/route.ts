import { generateSound } from "@/lib/generateSound";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(req: NextRequest) {
  const { caption } = await req.json();

  const output = await generateSound(caption);

  return NextResponse.json({ output });
}
