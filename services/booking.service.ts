/* eslint-disable @typescript-eslint/no-explicit-any */
import { nanoid } from "nanoid";
import { differenceInDays } from "date-fns";
import * as bookingRepo from "@/repositories/booking.repository";
import { getRoomById } from "@/repositories/room.repository";
import { RoomAvailability } from "@/constants/room-availability";

export const createBookingService = async (data: any) => {
  const room = await getRoomById(data.roomId);

  if (!room) {
    throw new Error("Room not found");
  }

  if (room.availability !== RoomAvailability.AVAILABLE) {
    throw new Error("Room is not available");
  }

  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);

  if (checkOut <= checkIn) {
    throw new Error("Invalid date range");
  }

  const nights = differenceInDays(checkOut, checkIn);

  if (nights <= 0) {
    throw new Error("Minimum 1 night booking required");
  }

  const totalAmount = nights * room.pricePerNight;
  const bookingId = `BK-${nanoid(8).toUpperCase()}`;

  return bookingRepo.createBooking({
    bookingId,
    roomId: room._id,
    roomName: room.name,
    checkIn,
    checkOut,
    adults: data.adults,
    children: data.children,
    nights,
    totalAmount,
    guest: data.guest,
    paymentStatus: "PENDING",
    bookingStatus: "CONFIRMED",
  });
};
