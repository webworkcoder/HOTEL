/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resend } from "resend";
import { bookingConfirmationEmail, adminBookingEmail } from "./email.templates";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendBookingEmails = async (booking: any) => {
  try {
    await resend.emails.send({
      from: `Hotel Blue Plaza <${process.env.HOTEL_EMAIL}>`,
      to: booking.guest.email,
      subject: "Booking Confirmed - Hotel",
      html: bookingConfirmationEmail(booking),
    });

    await resend.emails.send({
      from: `Hotel Blue Plaza <${process.env.HOTEL_EMAIL}>`,
      to: "hotelblueplaza@gmail.com",
      subject: "New Booking Received",
      html: adminBookingEmail(booking),
    });

    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
};
