/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateRoom } from "@/hooks/queries/use-create-room";
import { useAdminRoom } from "@/hooks/queries/useAdminRoom";
import { useUpdateRoom } from "@/hooks/queries/useUpdateRoom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  roomId?: string;
}

export const RoomForm = ({ roomId }: Props) => {
  const isEdit = !!roomId;

  const createRoom = useCreateRoom();
  const updateRoom = useUpdateRoom();
  const { data } = useAdminRoom(roomId || "");
  const room = data?.data?.data;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      roomType: "CLASSIC",
      pricePerNight: 0,
      maxAdults: 1,
      maxChildren: 0,
      amenities: "",
      images: "",
    },
  });

  useEffect(() => {
    if (!room) return;

    reset({
      name: room.name,
      description: room.description,
      roomType: room.roomType,
      pricePerNight: room.pricePerNight,
      maxAdults: room.maxAdults,
      maxChildren: room.maxChildren,
      amenities: room.amenities.join(", "),
      images: room.images.join(", "),
    });
  }, [room, reset]);

  const onSubmit = (values: any) => {
    const payload = {
      ...values,

      amenities: values.amenities.split(",").map((item: string) => item.trim()),

      images: values.images.split(",").map((item: string) => item.trim()),
    };

    if (isEdit) {
      updateRoom.mutate({
        id: roomId!,
        data: payload,
      });

      return;
    }

    createRoom.mutate(payload);
  };

  return (
    <div className="border border-border bg-card p-10 shadow-xl max-w-content-area w-[90%] mx-auto my-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="uppercase tracking-[0.35em] text-primary text-xs">
            Hotel Management
          </p>

          <h2 className="text-4xl font-heading mt-3">
            {isEdit ? "Update Room" : "Create Room"}
          </h2>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-6"
      >
        <input
          placeholder="Room Name"
          {...register("name")}
          className="border p-4"
        />

        <input
          type="number"
          placeholder="Price Per Night"
          {...register("pricePerNight")}
          className="border p-4"
        />

        <select {...register("roomType")} className="border p-4">
          <option value="CLASSIC">Classic</option>
          <option value="DELUXE">Deluxe</option>
          <option value="DUPLEX">Duplex</option>
          <option value="SUITE">Suite</option>
        </select>

        <input
          type="number"
          placeholder="Max Adults"
          {...register("maxAdults")}
          className="border p-4"
        />

        <input
          type="number"
          placeholder="Max Children"
          {...register("maxChildren")}
          className="border p-4"
        />

        <input
          placeholder="Wifi, TV, AC, Pool"
          {...register("amenities")}
          className="border p-4"
        />

        <textarea
          rows={6}
          placeholder="Room Description"
          {...register("description")}
          className="border p-4 md:col-span-2"
        />

        <textarea
          rows={4}
          placeholder="https://image1.jpg, https://image2.jpg"
          {...register("images")}
          className="border p-4 md:col-span-2"
        />

        <button
          type="submit"
          disabled={createRoom.isPending || updateRoom.isPending}
          className="
            bg-primary
            text-white
            py-4
            md:col-span-2
            hover:opacity-90
            transition-all
          "
        >
          {createRoom.isPending || updateRoom.isPending
            ? "Please wait..."
            : isEdit
              ? "Update Room"
              : "Create Room"}
        </button>
      </form>
    </div>
  );
};
