"use server";

import { uploadImage } from "./upload";

export async function uploadImageAction(file: string) {
  try {
    const url = await uploadImage(file);
    return { success: true, url };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
