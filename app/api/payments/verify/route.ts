/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import crypto from "crypto";
import { BookingModel } from "@/models";
import { PaymentStatus } from "@/constants/payment-status";
import { BookingStatus } from "@/constants/booking-status";
import { sendBookingEmails } from "@/services/email.service";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !bookingId
    ) {
      return Response.json(
        {
          success: false,
          message: "Missing payment verification fields",
        },
        { status: 400 },
      );
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return Response.json(
        {
          success: false,
          message: "Invalid payment signature",
        },
        { status: 400 },
      );
    }

    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
      return Response.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 },
      );
    }

    booking.paymentStatus = PaymentStatus.SUCCESS;
    booking.bookingStatus = BookingStatus.CONFIRMED;

    booking.razorpayPaymentId = razorpay_payment_id;

    await booking.save();
    await sendBookingEmails(booking);

    return Response.json({
      success: true,
      message: "Payment verified successfully",
      data: booking,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || "Payment verification failed",
      },
      { status: 500 },
    );
  }
}
