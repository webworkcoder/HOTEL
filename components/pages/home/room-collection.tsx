"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { api } from "@/lib/endpoints";

export const RoomCollection = () => {
  const router = useRouter();
  const [roomsList, setRoomsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.rooms.getAll();
        setRoomsList(((res as any)?.data || []).slice(0, 5));
      } catch (err: any) {
        setError(err.message || "Failed to load collection");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

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

  if (isLoading) {
    return (
      <section className="py-10 lg:py-20 bg-background overflow-hidden">
        <div className="max-w-content-area w-[90%] mx-auto">
          <SectionHeading
            tag="Explore Our Rooms"
            title="Room and Suite Collection"
            description="Experience luxury, comfort and elegance with our premium collection of rooms and suites."
          />
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm font-medium">Loading collection...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || roomsList.length === 0) {
    return null;
  }

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
              {roomsList.map((room) => (
                <div key={room._id} className="min-w-0 flex-[0_0_100%]">
                  <div className="bg-card border border-border overflow-hidden grid lg:grid-cols-2">
                    <div className="relative min-h-70 sm:min-h-87.5 lg:min-h-125 order-1 lg:order-2">
                      <Image
                        src={room.images?.[0] || "/images/placeholder.jpg"}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-primary-foreground order-2 lg:order-1">
                      <div className="flex items-start gap-2 mb-5">
                        {room.availability === "UNAVAILABLE" ? (
                          <span className="text-xs uppercase tracking-widest font-bold bg-destructive/10 text-destructive py-2 px-4">
                            Unavailable
                          </span>
                        ) : (
                          <>
                            <span className="text-sm text-muted-foreground mt-2">
                              From
                            </span>

                            <div>
                              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-primary">
                                ₹{(room.pricePerNight / 1000).toFixed(0)}K{" "}
                                <span className="text-muted-foreground text-sm">
                                  / Night
                                </span>
                              </h3>
                            </div>
                          </>
                        )}
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl mb-4">
                        {room.name}
                      </h3>

                      <p className="text-muted-foreground leading-7 sm:leading-8 mb-8 line-clamp-3">
                        {room.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 text-sm">
                        <div>
                          <p className="text-muted-foreground">Room Size</p>
                          <p className="font-semibold">45 m²</p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">Guests</p>
                          <p className="font-semibold">{room.maxAdults} Adults</p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">Bed</p>
                          <p className="font-semibold">King Size</p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">View</p>
                          <p className="font-semibold">Sea View</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          disabled={room.availability === "UNAVAILABLE"}
                          onClick={() => router.push(`/rooms/${room._id}`)}
                          className="rounded-none py-6 px-8 w-full sm:w-auto cursor-pointer"
                        >
                          Book Now
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => router.push(`/rooms/${room._id}`)}
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
            {roomsList.map((_, index) => (
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
