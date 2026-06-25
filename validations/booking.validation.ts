import { z } from "zod";

export const createBookingSchema = z.object({
  roomId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number().min(1),
  children: z.number().min(0),
  guest: z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(10),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  }),
});
