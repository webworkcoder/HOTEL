import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      success: true,
      message: "Database Connected Successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Database Connection Failed",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
