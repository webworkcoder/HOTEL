import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(20),
  roomType: z.enum(["CLASSIC", "DELUXE", "DUPLEX", "SUITE"]),
  pricePerNight: z.number().min(1),
  maxAdults: z.number().min(1),
  maxChildren: z.number().min(0),
  amenities: z.array(z.string()),
  images: z.array(z.string()).min(1),
});
