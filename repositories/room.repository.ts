/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomAvailability } from "@/constants/room-availability";
import { RoomModel } from "@/models";

export const createRoom = (data: any) => {
  return RoomModel.create(data);
};

export const getRooms = () => {
  return RoomModel.find().sort({
    createdAt: -1,
  });
};

export const getAvailableRooms = () => {
  return RoomModel.find({
    availability: RoomAvailability.AVAILABLE,
  });
};

export const getRoomById = (id: string) => {
  return RoomModel.findById(id);
};

export const getRoomBySlug = (slug: string) => {
  return RoomModel.findOne({ slug });
};

export const updateRoom = (id: string, data: any) => {
  return RoomModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteRoom = (id: string) => {
  return RoomModel.findByIdAndDelete(id);
};
