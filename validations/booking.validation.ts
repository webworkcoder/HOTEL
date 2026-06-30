import { z } from "zod";

export const createBookingSchema = z.object({
  roomId: z.string(),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  adults: z.number().min(1, "At least 1 adult is required"),
  children: z.number().min(0),
  guest: z.object({
    fullName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  }),
});
