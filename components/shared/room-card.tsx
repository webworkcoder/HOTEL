import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";

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
  title,
  image,
  location = "Hotel Blu Plaza",
  price,
  guests = 2,
  href,
}: IRoomCardProps) => {
  return (
    <Link
      href={href || `/rooms/${id}`}
      className="group block min-w-70 md:min-w-[320px]"
    >
      <div className="relative overflow-hidden bg-card">
        {/* Image */}
        <div className="relative h-105 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
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
          <h3 className="font-heading text-xl mb-2">{title}</h3>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </div>

            <div className="font-semibold text-primary">
              ₹{price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
