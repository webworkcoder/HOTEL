import bcrypt from "bcryptjs";
import { AdminModel } from "@/models";
import { signToken } from "@/lib/jwt";

export const loginAdmin = async (email: string, password: string) => {
  const admin = await AdminModel.findOne({ email });

  if (!admin) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = await signToken({
    id: admin._id,
    role: admin.role,
    email: admin.email,
  });

  return token;
};
