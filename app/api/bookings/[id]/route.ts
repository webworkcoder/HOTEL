/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { BookingModel } from "@/models";
import { sendBookingEmails } from "@/services/email.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const booking = await BookingModel.findById(id).populate("roomId");

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const booking = await BookingModel.findByIdAndUpdate(id, body, { new: true });

    if (!booking) {
      return Response.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 },
      );
    }

    if (body.invoiceUrl) {
      await sendBookingEmails(booking);
    }

    return Response.json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || "Error updating booking",
      },
      { status: 500 },
    );
  }
}
