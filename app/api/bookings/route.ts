/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { createBookingSchema } from "@/validations/booking.validation";
import { createBookingService } from "@/services/booking.service";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const parsed = createBookingSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.format(),
        },
        { status: 400 },
      );
    }

    const booking = await createBookingService(parsed.data);

    return Response.json({
      success: true,
      message: "Booking created successfully",
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
