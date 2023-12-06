"use server";
import { revalidatePath } from "next/cache";

export const revalidateHome = async () => {
  revalidatePath("/");
};
