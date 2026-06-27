/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, BedDouble, Wifi, Coffee, Tv } from "lucide-react";

import { rooms } from "@/data/rooms";
import { PageBanner } from "@/components/shared/page-banner";
import { SuggestedRoom } from "../home/suggested-room";
import { RoomBookingForm } from "@/components/shared/room-booking-form";

interface Props {
  id: string;
}

export const SingleRoom = ({ id }: Props) => {
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return <div className="py-40 text-center">Room not found</div>;
  }

  const [activeImage, setActiveImage] = useState(room.images[0]);

  return (
    <>
      <PageBanner
        title={room.name}
        description={room.description}
        image={room.images[0]}
      />

      <section className="py-10 lg:py-20">
        <div className="max-w-content-area w-[90%] mx-auto">
          {/* Gallery */}
          <div className="grid lg:grid-cols-[70%_30%] gap-5 mb-16">
            {/* Main Image */}
            <div className="relative h-[650px] overflow-hidden">
              <Image
                src={activeImage}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Side Images */}
            <div className="grid grid-rows-4 gap-5">
              {room.images.map((image) => (
                <button
                  key={image}
                  onClick={() => setActiveImage(image)}
                  className={`
                    relative
                    overflow-hidden
                    h-[150px]
                    border-2
                    transition-all
                    duration-300
                    ${
                      activeImage === image
                        ? "border-primary scale-[1.02]"
                        : "border-transparent"
                    }
                  `}
                >
                  <Image src={image} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-[60%_40%] gap-12">
            {/* Left */}
            <div>
              <div className="border-b border-border pb-10 mb-10">
                <h1 className="text-5xl font-heading mb-8">{room.name}</h1>

                <div className="grid sm:grid-cols-4 gap-6">
                  <div>
                    <p className="text-muted-foreground">Room Type</p>

                    <h3 className="font-semibold text-xl">{room.roomType}</h3>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Price</p>

                    <h3 className="font-semibold text-xl text-primary">
                      ₹{room.pricePerNight.toLocaleString()}
                    </h3>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Adults</p>

                    <h3 className="font-semibold text-xl">{room.maxAdults}</h3>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Children</p>

                    <h3 className="font-semibold text-xl">
                      {room.maxChildren}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-heading mb-5">About This Room</h2>

                <p className="text-muted-foreground leading-8">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-12">
                <h2 className="text-3xl font-heading mb-8">Amenities</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {room.amenities.map((item) => (
                    <div
                      key={item}
                      className="
                        border border-border
                        p-5
                        bg-card
                        hover:-translate-y-1
                        transition-all
                      "
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="border p-6 text-center">
                  <Users className="mx-auto mb-3" />
                  {room.maxAdults} Guests
                </div>

                <div className="border p-6 text-center">
                  <BedDouble className="mx-auto mb-3" />
                  King Bed
                </div>

                <div className="border p-6 text-center">
                  <Wifi className="mx-auto mb-3" />
                  Free Wifi
                </div>

                <div className="border p-6 text-center">
                  <Coffee className="mx-auto mb-3" />
                  Breakfast
                </div>
              </div>
            </div>

            {/* Booking */}
            <div className="lg:sticky top-24 h-fit">
              <RoomBookingForm roomId={room.id} />
            </div>
          </div>
        </div>
      </section>

      <SuggestedRoom />
    </>
  );
};
