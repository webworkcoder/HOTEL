/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export interface IRoomCardProps {
  id: string;
  title: string;
  image: string;
  location?: string;
  price: number;
  guests?: number;
  href?: string;
}

export const RoomCard = ({
  id,
  name,
  images,
  location = "Hotel Blu Plaza",
  pricePerNight,
  guests = 2,
  href,
  availability = "AVAILABLE",
}: any) => {
  return (
    <Link
      href={href || `/rooms/${id}`}
      className="group block min-w-70 md:min-w-[320px]"
    >
      <div className="relative overflow-hidden bg-card">
        {/* Availability Badge */}
        {availability === "UNAVAILABLE" && (
          <div className="absolute top-4 right-4 z-10 bg-destructive text-destructive-foreground text-[10px] uppercase tracking-wider font-semibold py-1 px-3">
            Unavailable
          </div>
        )}

        {/* Image */}
        <div className="relative h-105 overflow-hidden">
          <Image
            src={images?.[0] || "/images/placeholder.jpg"}
            alt={name}
            fill
            className={`
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
              ${availability === "UNAVAILABLE" ? "grayscale opacity-80" : ""}
            `}
          />

          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500" />
        </div>

        {/* Bottom Glass Card */}
        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
            bg-white/80
            backdrop-blur-xl
            p-4
            shadow-xl
          "
        >
          <h3 className="font-heading text-xl mb-2">{name}</h3>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </div>

            <div className="font-semibold text-primary">
              {availability === "UNAVAILABLE" ? (
                <span className="text-destructive font-semibold">Unavailable</span>
              ) : (
                `₹${pricePerNight?.toLocaleString()}`
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
