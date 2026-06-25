/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { razorpay } from "@/services/payment.service";
import { BookingModel } from "@/models";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { bookingId } = await req.json();
    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
      return Response.json(
        { success: false, message: "Booking not found" },
        { status: 404 },
      );
    }

    const options = {
      amount: booking.totalAmount * 100,
      currency: "INR",
      receipt: booking.bookingId,
    };

    const order = await razorpay.orders.create(options);
    booking.razorpayOrderId = order.id;
    await booking.save();

    return Response.json({
      success: true,
      data: order,
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
