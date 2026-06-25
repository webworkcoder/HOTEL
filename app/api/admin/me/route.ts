import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { AdminModel } from "@/models";

export async function GET() {
  await connectDB();
  const token = (await cookies()).get("admin_token")?.value;

  if (!token) {
    return Response.json({ admin: null });
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return Response.json({ admin: null });
  }

  const admin = await AdminModel.findById(payload.id).select("-password");
  return Response.json({
    admin,
  });
}
