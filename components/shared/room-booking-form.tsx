"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Users, User, Mail, Phone } from "lucide-react";
import { z } from "zod";

import { createBookingSchema } from "@/validations/booking.validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type BookingFormValues = z.infer<typeof createBookingSchema>;

interface Props {
  roomId: string;
  roomPrice?: number;
  roomName?: string;
}

export const RoomBookingForm = ({
  roomId,
  roomPrice = 12000,
  roomName = "Luxury Suite",
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(createBookingSchema),

    defaultValues: {
      roomId,
      checkIn: "",
      checkOut: "",
      adults: 1,
      children: 0,
      guest: {
        fullName: "",
        email: "",
        phone: "",
        gender: "MALE",
      },
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const totalAmount = nights * roomPrice;

  const onSubmit = async (values: BookingFormValues) => {
    console.log(values);
  };

  return (
    <div
      className="
        sticky top-24
        border border-border
        bg-card
        p-8
        shadow-md
      "
    >
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <span className="text-primary uppercase tracking-[0.35em] text-xs font-semibold">
          Reservation
        </span>

        <h3 className="text-3xl font-heading mt-3">Book This Room</h3>

        <p className="text-muted-foreground mt-2 leading-7">
          Reserve your luxury stay in just a few steps.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Check In */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <CalendarDays size={16} />
            Check In
          </label>

          <Input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            {...register("checkIn")}
            className="h-12 rounded-none"
          />

          {errors.checkIn && (
            <p className="text-sm text-red-500 mt-1">
              {errors.checkIn.message}
            </p>
          )}
        </div>

        {/* Check Out */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <CalendarDays size={16} />
            Check Out
          </label>

          <Input
            type="date"
            min={checkIn || new Date().toISOString().split("T")[0]}
            {...register("checkOut")}
            className="h-12 rounded-none"
          />

          {errors.checkOut && (
            <p className="text-sm text-red-500 mt-1">
              {errors.checkOut.message}
            </p>
          )}
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 flex items-center gap-2 font-medium">
              <Users size={16} />
              Adults
            </label>

            <Input
              type="number"
              min={1}
              className="h-12 rounded-none"
              {...register("adults", {
                valueAsNumber: true,
              })}
            />

            {errors.adults && (
              <p className="text-sm text-red-500 mt-1">
                {errors.adults.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 font-medium">
              <Users size={16} />
              Children
            </label>

            <Input
              type="number"
              min={0}
              className="h-12 rounded-none"
              {...register("children", {
                valueAsNumber: true,
              })}
            />

            {errors.children && (
              <p className="text-sm text-red-500 mt-1">
                {errors.children.message}
              </p>
            )}
          </div>
        </div>

        {/* Guest Information */}
        <div className="pt-6 border-t border-border">
          <h4 className="text-xl font-heading mb-5">Guest Information</h4>

          <div className="space-y-5">
            <div>
              <label className="mb-2 flex items-center gap-2 font-medium">
                <User size={16} />
                Full Name
              </label>

              <Input
                placeholder="John Doe"
                className="h-12 rounded-none"
                {...register("guest.fullName")}
              />

              {errors.guest?.fullName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.guest.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-medium">
                <Mail size={16} />
                Email Address
              </label>

              <Input
                type="email"
                placeholder="john@example.com"
                className="h-12 rounded-none"
                {...register("guest.email")}
              />

              {errors.guest?.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.guest.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-medium">
                <Phone size={16} />
                Phone Number
              </label>

              <Input
                placeholder="+91 9876543210"
                className="h-12 rounded-none"
                {...register("guest.phone")}
              />

              {errors.guest?.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.guest.phone.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 flex items-center gap-2 font-medium">
                <User size={16} />
                Gender
              </label>

              <select
                {...register("guest.gender")}
                className="
                  h-12
                  w-full
                  border
                  border-input
                  bg-background
                  px-4
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                "
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>

              {errors.guest?.gender && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.guest.gender.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-muted border border-border p-5 mt-8">
          <h4 className="font-semibold text-lg mb-4">Booking Summary</h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Room</span>

              <span>{roomName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Nights</span>

              <span>{nights}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Price / Night</span>

              <span>₹{roomPrice.toLocaleString()}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-semibold">
              <span>Total Amount</span>

              <span className="text-primary">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="
            w-full
            h-14
            rounded-none
            text-base
            font-semibold
          "
        >
          Reserve Now
        </Button>
      </form>
    </div>
  );
};
