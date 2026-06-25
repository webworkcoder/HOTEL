import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).set("admin_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return Response.json({
    success: true,
    message: "Logged out successfully",
  });
}
