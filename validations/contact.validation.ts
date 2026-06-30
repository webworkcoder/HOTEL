import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subject: z.string(),
});
