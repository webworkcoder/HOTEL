"use client";

import { Pencil, Trash2, Eye, BedDouble, DoorOpen } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

const rooms = [
  {
    _id: "1",
    name: "Luxury Suite",
    roomType: "SUITE",
    pricePerNight: 12000,
    availability: "AVAILABLE",
    images: ["/images/room6.png"],
  },
  {
    _id: "2",
    name: "Presidential Suite",
    roomType: "DELUXE",
    pricePerNight: 22000,
    availability: "BOOKED",
    images: ["/images/room5.png"],
  },
];

export const RoomsTable = () => {
  return (
    <div className="border border-border bg-card overflow-hidden">
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
          {rooms.map((room) => (
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

                  <button className="h-10 w-10 border flex items-center justify-center text-red-500 cursor-pointer">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
