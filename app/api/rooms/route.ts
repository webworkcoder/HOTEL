/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { getRoomsService } from "@/services/room.service";

export async function GET() {
  try {
    await connectDB();
    const rooms = await getRoomsService();

    return Response.json({
      success: true,
      data: rooms,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
