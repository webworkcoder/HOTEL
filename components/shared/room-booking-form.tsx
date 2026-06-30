/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Users, User, Mail, Phone, Loader2 } from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBookingSchema } from "@/validations/booking.validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/endpoints";
import { premiumToast } from "./premium-toast";

type BookingFormValues = z.infer<typeof createBookingSchema>;

interface Props {
  roomId: string;
  roomPrice?: number;
  roomName?: string;
  roomAvailability?: string;
}

export const RoomBookingForm = ({
  roomId,
  roomPrice = 12000,
  roomName = "Luxury Suite",
  roomAvailability = "AVAILABLE",
}: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const onSubmit = async (values: any) => {
    if (roomAvailability === "UNAVAILABLE") {
      toast.error("This room is currently unavailable and cannot be booked.");
      return;
    }

    try {
      setIsSubmitting(true);
      const createRes = await api.bookings.create(values);
      const bookingData = (createRes as any)?.data;
      if (!createRes || !(createRes as any).success || !bookingData) {
        throw new Error(
          (createRes as any)?.message || "Failed to initiate booking",
        );
      }

      const bookingId = bookingData._id;

      const orderRes = await api.payments.createOrder(bookingId);
      const orderData = (orderRes as any)?.data;
      if (!orderRes || !(orderRes as any).success || !orderData) {
        throw new Error(
          (orderRes as any)?.message || "Failed to create payment order",
        );
      }

      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_STVgsbCSgwNiwh",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Hotel Blu Plaza",
        description: `Booking for ${roomName}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            setIsSubmitting(true);
            const verifyRes = await api.payments.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
            });

            if ((verifyRes as any)?.success) {
              premiumToast.success({
                title: "Booking Confirmed",
                description:
                  "Your stay at Blu Plaza has been successfully reserved.",
              });

              setTimeout(() => {
                router.push(`/booking-success?id=${bookingId}`);
              }, 800);
            } else {
              premiumToast.error({
                title: "Payment Verification Failed",
                description: "Signature verification could not be completed.",
              });
            }
          } catch (err: any) {
            toast.error(err.message || "Failed to verify signature.");
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: values.guest.fullName,
          email: values.guest.email,
          contact: values.guest.phone,
        },
        theme: {
          color: "#c5a27a",
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled by guest");
            setIsSubmitting(false);
          },
        },
      };

      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        throw new Error(
          "Razorpay payment gateway is not loaded. Please reload the page.",
        );
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during reservation.");
      setIsSubmitting(false);
    }
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

      {roomAvailability === "UNAVAILABLE" && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold flex items-center justify-center text-center">
          ⚠️ This room is currently unavailable and cannot be reserved.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Check In */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium text-muted-foreground">
            <CalendarDays size={16} />
            Check-in Date
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

        <div>
          <label className="mb-2 flex items-center gap-2 font-medium text-muted-foreground">
            <CalendarDays size={16} />
            Check-out Date
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
            <label className="mb-2 flex items-center gap-2 font-medium text-muted-foreground">
              <Users size={16} />
              Adults (Age 12+)
            </label>

            <Input
              type="text"
              className="h-12 rounded-none"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
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
            <label className="mb-2 flex items-center gap-2 font-medium text-muted-foreground">
              <Users size={16} />
              Children (Below 12)
            </label>

            <Input
              type="text"
              className="h-12 rounded-none"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
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
          <h4 className="text-xl font-heading mb-5">
            {" "}
            Primary Guest Information
          </h4>

          <div className="space-y-5">
            <div>
              <label className="mb-2 flex items-center gap-2 font-medium text-muted-foreground">
                <User size={16} />
                Full Name
              </label>

              <Input
                placeholder="Enter guest full name"
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
              <label className="mb-2 flex items-center gap-2 font-medium text-muted-foreground">
                <Mail size={16} />
                Email Address
              </label>

              <Input
                type="email"
                placeholder="Enter email address"
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
              <label className="mb-2 flex items-center gap-2 font-medium text-muted-foreground">
                <Phone size={16} />
                Phone Number
              </label>

              <Input
                placeholder="Enter contact number"
                className="h-12 rounded-none"
                maxLength={10}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
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
              <label className="mb-2 flex items-center gap-2 font-medium text-muted-foreground">
                <User size={16} />
                Gender Identity
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
          <h4 className="font-semibold text-lg mb-4">Your Booking Summary</h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selected Room</span>

              <span>{roomName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration of Stay</span>

              <span>{nights}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate per Night</span>

              <span>₹{roomPrice.toLocaleString()}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-semibold">
              <span>Total Payable Amount</span>

              <span className="text-primary">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || roomAvailability === "UNAVAILABLE"}
          className="
            w-full
            h-14
            rounded-none
            text-base
            font-semibold
            cursor-pointer
          "
        >
          {roomAvailability === "UNAVAILABLE" ? (
            "Room Unavailable"
          ) : isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </div>
          ) : (
            "Complete Your Booking"
          )}
        </Button>
      </form>
    </div>
  );
};
