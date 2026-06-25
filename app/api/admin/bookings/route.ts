/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { BookingModel } from "@/models";

export async function GET() {
  try {
    await connectDB();
    const bookings = await BookingModel.find()
      .populate("roomId")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
