/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { ContactModel } from "@/models";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        {
          success: false,
          message: "Name, email, and message are required fields.",
        },
        { status: 400 }
      );
    }

    const contact = await ContactModel.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return Response.json({
      success: true,
      message: "Your message has been sent successfully!",
      data: contact,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to submit contact details.",
      },
      { status: 500 }
    );
  }
}
