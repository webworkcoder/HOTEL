/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { loginAdmin } from "@/services/admin.service";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    const token = await loginAdmin(email, password);

    (await cookies()).set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return Response.json({
      success: true,
      message: "Login successful",
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || "Login failed",
      },
      { status: 401 },
    );
  }
}
