import bcrypt from "bcryptjs";
import { AdminModel } from "@/models";

export const seedAdmin = async () => {
  const existing = await AdminModel.findOne();

  if (existing) return;

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  await AdminModel.create({
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    role: "ADMIN",
  });

  console.log("Admin seeded successfully");
};
