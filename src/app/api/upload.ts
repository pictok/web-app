import { NextApiRequest, NextApiResponse } from "next";
import { writeFile } from "fs/promises";
import { join } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const file: File | null = req.body?.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(process.cwd(), "public", "images", "photos", file.name);
  await writeFile(path, buffer);

  return res.status(200).json({ success: true });
}
