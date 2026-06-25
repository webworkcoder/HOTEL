/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookingModel } from "@/models";

export const createBooking = (data: any) => {
  return BookingModel.create(data);
};

export const getBookings = () => {
  return BookingModel.find().populate("roomId").sort({
    createdAt: -1,
  });
};

export const getBookingById = (id: string) => {
  return BookingModel.findById(id);
};

export const updateBooking = (id: string, data: any) => {
  return BookingModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const getBookingByOrderId = (orderId: string) => {
  return BookingModel.findOne({
    razorpayOrderId: orderId,
  });
};
