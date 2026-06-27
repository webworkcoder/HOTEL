"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";

const rooms = [
  {
    id: 1,
    title: "Standard Room",
    price: 12000,
    description:
      "Enjoy a luxurious stay with premium amenities, modern interiors and exceptional comfort.",
    size: "45 m²",
    guests: "2 Adults",
    bed: "King Size",
    view: "City View",
    image: "/images/room5.png",
  },
  {
    id: 2,
    title: "Deluxe Suite",
    price: 18000,
    description:
      "Spacious suites with premium interiors and panoramic city views.",
    size: "65 m²",
    guests: "3 Adults",
    bed: "King Size",
    view: "Sea View",
    image: "/images/room3.webp",
  },
  {
    id: 3,
    title: "Presidential Suite",
    price: 30000,
    description:
      "Experience unmatched luxury with private lounge and premium amenities.",
    size: "120 m²",
    guests: "4 Adults",
    bed: "2 King Beds",
    view: "Panoramic View",
    image: "/images/room4.webp",
  },
];

export const RoomCollection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-10 lg:py-20 bg-background overflow-hidden">
      <div className="max-w-content-area w-[90%] mx-auto">
        <SectionHeading
          tag="Explore Our Rooms"
          title="Room and Suite Collection"
          description="Experience luxury, comfort and elegance with our premium collection of rooms and suites."
        />

        <div className="relative">
          {/* Prev */}
          <button
            onClick={scrollPrev}
            className="
              absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20
              h-10 w-10 lg:h-12 lg:w-12
              rounded-full
              md:bg-black/50
              md:text-muted
              backdrop-blur-xl
              border border-white/10
              flex items-center justify-center
              hover:bg-primary
              transition-all duration-300
              cursor-pointer
              text-accent
            "
          >
            <ArrowLeft size={20} />
          </button>

          {/* Next */}
          <button
            onClick={scrollNext}
            className="
              absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20
              h-10 w-10 lg:h-12 lg:w-12
              rounded-full
              md:bg-black/50
              md:text-muted
              backdrop-blur-xl
              border border-white/10
              flex items-center justify-center
              hover:bg-primary
              transition-all duration-300
              cursor-pointer
              text-accent
            "
          >
            <ArrowRight size={20} />
          </button>

          {/* Slider */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {rooms.map((room) => (
                <div key={room.id} className="min-w-0 flex-[0_0_100%]">
                  <div className="bg-card border border-border overflow-hidden grid lg:grid-cols-2">
                    <div className="relative min-h-70 sm:min-h-87.5 lg:min-h-125 order-1 lg:order-2">
                      <Image
                        src={room.image}
                        alt={room.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-primary-foreground order-2 lg:order-1">
                      <div className="flex items-start gap-2 mb-5">
                        <span className="text-sm text-muted-foreground mt-2">
                          From
                        </span>

                        <div>
                          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-primary">
                            ₹{(room.price / 1000).toFixed(0)}K{" "}
                            <span className="text-muted-foreground text-sm">
                              / Night
                            </span>
                          </h3>
                        </div>
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl mb-4">
                        {room.title}
                      </h3>

                      <p className="text-muted-foreground leading-7 sm:leading-8 mb-8">
                        {room.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 text-sm">
                        <div>
                          <p className="text-muted-foreground">Room Size</p>
                          <p className="font-semibold">{room.size}</p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">Guests</p>
                          <p className="font-semibold">{room.guests}</p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">Bed</p>
                          <p className="font-semibold">{room.bed}</p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">View</p>
                          <p className="font-semibold">{room.view}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="rounded-none py-6 px-8 w-full sm:w-auto cursor-pointer">
                          Book Now
                        </Button>

                        <Button
                          variant="outline"
                          className="rounded-none py-6 px-8 w-full sm:w-auto cursor-pointer"
                        >
                          View Room
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`
        transition-all duration-500 rounded-full cursor-pointer
        ${
          selectedIndex === index
            ? "w-12 h-1 bg-primary"
            : "w-4 h-1 bg-primary/30 hover:bg-primary/50"
        }
      `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
