/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { BookingModel } from "@/models";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const booking = await BookingModel.findById(params.id).populate("roomId");

    if (!booking) {
      return Response.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      data: booking,
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
