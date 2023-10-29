"use server";

import crypto from "crypto";

export const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
