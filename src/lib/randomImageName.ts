"use server";

import crypto from "crypto";

export const randomName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
