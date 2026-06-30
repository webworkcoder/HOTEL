"use client";

import { Pencil, Trash2, Eye, BedDouble, DoorOpen, Loader2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useRooms } from "@/hooks/queries/useRooms";
import { useDeleteRoom } from "@/hooks/queries/useDeleteRoom";

interface Room {
  _id: string;
  name: string;
  roomType: string;
  pricePerNight: number;
  availability: "AVAILABLE" | "UNAVAILABLE" | "BOOKED";
  images: string[];
}

export const RoomsTable = () => {
  const { data: roomsData, isLoading, error } = useRooms();
  const deleteRoom = useDeleteRoom();
  const rooms: Room[] = (roomsData as any)?.data || [];
  
  console.log("Rooms data:", roomsData);
  console.log("Rooms array:", rooms);
  console.log("Error:", error);
  return (
    <div className="border border-border bg-card overflow-hidden">
      {error && (
        <div className="bg-red-50 border-b border-red-200 p-4 text-red-700 text-sm">
          Error loading rooms: {(error as any)?.message || "Unknown error"}
        </div>
      )}
      {isLoading ? (
        <div className="flex items-center justify-center p-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading rooms...</span>
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center p-10 text-muted-foreground">
          No rooms found. Create one to get started!
        </div>
      ) : (
        <table className="w-full">
        <thead className="bg-muted">
          <tr className="text-left">
            <th className="p-5">Room</th>
            <th className="p-5">Type</th>
            <th className="p-5">Price</th>
            <th className="p-5">Availability</th>
            <th className="p-5 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room: Room) => (
            <tr
              key={room._id}
              className="border-t border-border hover:bg-muted/50 transition-all"
            >
              <td className="p-5">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-28 overflow-hidden">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">{room.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      Room ID: {room._id}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-5">
                <span className="bg-primary/10 text-primary px-3 py-1 text-sm">
                  {room.roomType}
                </span>
              </td>

              <td className="p-5 font-semibold">
                ₹{room.pricePerNight.toLocaleString()}
              </td>

              <td className="p-5">
                <span
                  className={`px-3 py-1 text-sm ${
                    room.availability === "AVAILABLE"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {room.availability}
                </span>
              </td>

              <td className="p-5">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/rooms/${room._id}`}
                    className="h-10 w-10 border flex items-center justify-center"
                  >
                    <DoorOpen size={18} />
                  </Link>

                  <Link
                    href={`/dashboard/rooms/${room._id}`}
                    className="
                    h-10
                    w-10
                    border
                    flex
                    items-center
                    justify-center
                    hover:bg-primary
                    hover:text-white
                    transition-all
  "
                  >
                    <Pencil size={18} />
                  </Link>

                  <button 
                    onClick={() => deleteRoom.mutate(room._id)}
                    disabled={deleteRoom.isPending}
                    className="h-10 w-10 border flex items-center justify-center text-red-500 hover:bg-red-50 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {deleteRoom.isPending ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};
