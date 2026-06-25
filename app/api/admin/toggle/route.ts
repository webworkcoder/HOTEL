/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { toggleRoomAvailabilityService } from "@/services/room.service";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const updatedRoom = await toggleRoomAvailabilityService(id);

    return Response.json({
      success: true,
      message: "Room availability updated",
      data: updatedRoom,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || "Error updating room",
      },
      { status: 500 },
    );
  }
}
