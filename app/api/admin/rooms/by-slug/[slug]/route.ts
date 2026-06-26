/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getRoomBySlugService } from "@/services/room.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();
    const { slug } = await params;
    const room = await getRoomBySlugService(slug);

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
