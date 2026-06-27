"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RoomCard } from "@/components/shared/room-card";
import { rooms } from "@/data/rooms";

// const rooms = [
//   {
//     id: "1",
//     title: "Comfort Room",
//     image: "/images/room5.png",
//     location: "Hotel Blu Plaza",
//     price: 12000,
//   },
//   {
//     id: "2",
//     title: "Luxury Room",
//     image: "/images/room6.png",
//     location: "Hotel Blu Plaza",
//     price: 15000,
//   },
//   {
//     id: "3",
//     title: "Standard Room",
//     image: "/images/room.webp",
//     location: "Hotel Blu Plaza",
//     price: 10000,
//   },
//   {
//     id: "4",
//     title: "Normal Room",
//     image: "/images/room3.webp",
//     location: "Hotel Blu Plaza",
//     price: 8000,
//   },
//   {
//     id: "5",
//     title: "Presidential Suite",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 25000,
//   },
// ];

export const SuggestedRoom = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  return (
    <section className="py-10 lg:py-20 bg-primary-foreground overflow-hidden">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-8">
          <SectionHeading
            tag="Room Type"
            title="Suggested Room"
            description="Discover our most loved rooms carefully designed to provide comfort, luxury and unforgettable experiences."
            align="left"
          />

          <div className="flex gap-3">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="
                h-12 w-12
                bg-primary
                text-white
                flex
                items-center
                justify-center
                hover:scale-105
                transition-all
                duration-300
                cursor-pointer
              "
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className="
                h-12 w-12
                bg-primary
                text-white
                flex
                items-center
                justify-center
                hover:scale-105
                transition-all
                duration-300
                cursor-pointer
              "
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
