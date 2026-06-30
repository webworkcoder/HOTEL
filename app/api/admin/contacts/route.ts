/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { ContactModel } from "@/models";

export async function GET() {
  try {
    await connectDB();
    const contacts = await ContactModel.find().sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: contacts,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to retrieve contact messages.",
      },
      { status: 500 }
    );
  }
}
