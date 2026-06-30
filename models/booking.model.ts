import mongoose, { Schema, Document, Model } from "mongoose";
import { BookingStatus } from "@/constants/booking-status";
import { PaymentStatus } from "@/constants/payment-status";
import { Gender } from "@/constants/gender";

export interface IBooking extends Document {
  bookingId: string;
  roomId: mongoose.Types.ObjectId;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  nights: number;
  guest: {
    fullName: string;
    email: string;
    phone: string;
    gender: Gender;
  };
  totalAmount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  invoiceUrl?: string;
}

const bookingSchema = new Schema<IBooking>(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    roomName: {
      type: String,
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    adults: {
      type: Number,
      required: true,
    },

    children: {
      type: Number,
      required: true,
    },

    nights: {
      type: Number,
      required: true,
    },

    guest: {
      fullName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        index: true,
      },

      phone: {
        type: String,
        required: true,
      },

      gender: {
        type: String,
        enum: Object.values(Gender),
      },
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },

    bookingStatus: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.CONFIRMED,
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    invoiceUrl: String,
  },
  {
    timestamps: true,
  },
);

bookingSchema.index({
  checkIn: 1,
  checkOut: 1,
});

bookingSchema.index({
  paymentStatus: 1,
});

export const BookingModel: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);
