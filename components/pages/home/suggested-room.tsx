/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RoomCard } from "@/components/shared/room-card";
import { api } from "@/lib/endpoints";

export const SuggestedRoom = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await api.rooms.getAll();
        setRooms((res as any)?.data || []);
      } catch (err) {
        console.error("Failed to fetch suggested rooms", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <section className="py-10 lg:py-20 bg-primary-foreground overflow-hidden">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-8">
          <SectionHeading
            tag="Handpicked Stays"
            title="Our Most Recommended Rooms"
            description="Explore carefully curated rooms designed for unmatched comfort, refined luxury, and a memorable stay experience."
            align="left"
          />

          <div className="flex gap-3">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="h-12 w-12 bg-primary text-white flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className="h-12 w-12 bg-primary text-white flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : (
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {rooms.map((room) => (
                <RoomCard key={room._id} id={room._id} {...room} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
