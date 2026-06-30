/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { updateRoomService, deleteRoomService, getRoomByIdService } from "@/services/room.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const room = await getRoomByIdService(id);

    if (!room) {
      return Response.json(
        {
          success: false,
          message: "Room not found",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const room = await updateRoomService(id, body);

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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    await deleteRoomService(id);

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
