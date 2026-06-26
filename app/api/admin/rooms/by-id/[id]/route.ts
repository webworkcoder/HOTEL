/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { updateRoomService, deleteRoomService } from "@/services/room.service";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const body = await req.json();
    const room = await updateRoomService(params.id, body);

    return Response.json({
      success: true,
      message: "Room updated",
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    await deleteRoomService(params.id);

    return Response.json({
      success: true,
      message: "Room deleted",
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
