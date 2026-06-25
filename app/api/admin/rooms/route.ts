/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { createRoomSchema } from "@/validations/room.validation";
import { createRoomService, getRoomsService } from "@/services/room.service";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const parsed = createRoomSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.format(),
        },
        { status: 400 },
      );
    }

    const room = await createRoomService(parsed.data);

    return Response.json({
      success: true,
      message: "Room created successfully",
      data: room,
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
