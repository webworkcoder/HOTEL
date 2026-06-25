/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomAvailability } from "@/constants/room-availability";
import * as repository from "@/repositories/room.repository";
import { generateSlug } from "@/utils/slug";

export const createRoomService = async (data: any) => {
  const slug = generateSlug(data.name);

  return repository.createRoom({
    ...data,
    slug,
  });
};

export const getRoomsService = async () => {
  return repository.getRooms();
};

export const getRoomBySlugService = async (slug: string) => {
  return repository.getRoomBySlug(slug);
};

export const updateRoomService = async (id: string, data: any) => {
  return repository.updateRoom(id, data);
};

export const deleteRoomService = async (id: string) => {
  return repository.deleteRoom(id);
};

export const toggleRoomAvailabilityService = async (id: string) => {
  const room = await repository.getRoomById(id);

  if (!room) {
    throw new Error("Room not found");
  }

  const newStatus =
    room.availability === RoomAvailability.AVAILABLE
      ? RoomAvailability.UNAVAILABLE
      : RoomAvailability.AVAILABLE;

  return repository.updateRoom(id, {
    availability: newStatus,
  });
};
