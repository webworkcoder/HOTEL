import { connectDB } from "@/lib/db";
import { seedAdmin } from "@/lib/seeder";

export async function GET() {
  await connectDB();
  await seedAdmin();

  return Response.json({
    success: true,
    message: "Admin seeded",
  });
}
