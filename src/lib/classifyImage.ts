import { replicate } from "./replicate";

const model =
  "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746";

export const classifyImage = async (image: string) =>
  await replicate.run(model, {
    input: { image },
  });
