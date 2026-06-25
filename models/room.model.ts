import mongoose, { Schema, Document, Model } from "mongoose";
import { RoomType } from "@/constants/room-type";
import { RoomAvailability } from "@/constants/room-availability";

export interface IRoom extends Document {
  name: string;
  slug: string;
  roomType: RoomType;
  description: string;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  maxAdults: number;
  maxChildren: number;
  availability: RoomAvailability;
}

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    roomType: {
      type: String,
      enum: Object.values(RoomType),
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    amenities: {
      type: [String],
      default: [],
    },

    maxAdults: {
      type: Number,
      required: true,
    },

    maxChildren: {
      type: Number,
      required: true,
    },

    availability: {
      type: String,
      enum: Object.values(RoomAvailability),
      default: RoomAvailability.AVAILABLE,
    },
  },
  {
    timestamps: true,
  },
);

roomSchema.index({
  roomType: 1,
  availability: 1,
});

export const RoomModel: Model<IRoom> =
  mongoose.models.Room || mongoose.model<IRoom>("Room", roomSchema);
