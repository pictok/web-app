import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { join } from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);

export default async function saveImage(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const imageBuffer = Buffer.from(req.body.image.split(",")[1], "base64");
      const imagePath = join(
        process.cwd(),
        "public",
        "images",
        "photos",
        `${Date.now()}.png`,
      );

      await writeFile(imagePath, imageBuffer);

      return res
        .status(200)
        .json({ success: true, message: "Image saved successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed." });
  }
}
