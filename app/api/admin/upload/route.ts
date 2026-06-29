/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadImage } from "@/lib/upload";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file } = body;

    if (!file) {
      return Response.json(
        {
          success: false,
          message: "No file provided",
        },
        { status: 400 }
      );
    }

    // Validate that file is a valid base64 string
    if (typeof file !== "string" || !file.startsWith("data:image/")) {
      return Response.json(
        {
          success: false,
          message: "Invalid file format. Please provide a valid image.",
        },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const url = await uploadImage(file);

    return Response.json({
      success: true,
      url,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to upload image",
      },
      { status: 500 }
    );
  }
}
