"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { SuggestedRoom } from "../home/suggested-room";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export const galleryImages = [
  {
    id: 1,
    image: "/images/gallery.JPG",
    title: "Grand Lobby Entrance",
    description:
      "A luxurious entrance welcoming guests with elegant interiors and warm ambiance.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    image: "/images/h1.JPG",
    title: "Premium Reception Area",
    description:
      "A beautifully designed reception space ensuring a smooth and premium check-in experience.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    image: "/images/hero.webp",
    title: "Luxury Hero Suite View",
    description:
      "A modern and elegant room setup showcasing comfort and sophistication.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    image: "/images/hero-section-hotel.JPG",
    title: "Hotel Exterior View",
    description:
      "A stunning architectural exterior reflecting modern luxury hospitality.",
    className: "md:col-span-1 md:row-span-2",
  },

  {
    id: 5,
    image: "/images/IMG_3317.JPG",
    title: "Executive Deluxe Room",
    description:
      "Spacious deluxe room with premium furnishings and warm lighting.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    image: "/images/IMG_3318.JPG",
    title: "Modern Luxury Bedroom",
    description: "Elegant bedroom designed for maximum comfort and relaxation.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 7,
    image: "/images/IMG_3319.JPG",
    title: "Premium Interior Setup",
    description:
      "Well-crafted interiors with modern design aesthetics and comfort.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 8,
    image: "/images/IMG_3320.JPG",
    title: "Luxury Bathroom Suite",
    description: "Clean and modern bathroom with high-end fittings and design.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 9,
    image: "/images/IMG_3321.JPG",
    title: "Cozy Double Bed Room",
    description: "Comfort-focused room ideal for relaxation and peaceful stay.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 10,
    image: "/images/IMG_3322.JPG",
    title: "Elegant Bedroom Interior",
    description: "Soft lighting and modern decor creating a premium ambiance.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 11,
    image: "/images/IMG_3323.JPG",
    title: "Luxury Bed View",
    description:
      "Premium bedding setup designed for ultimate comfort and rest.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 12,
    image: "/images/IMG_3325.JPG",
    title: "Hotel Corridor Design",
    description:
      "A clean and modern hallway reflecting premium hospitality standards.",
    className: "md:col-span-1 md:row-span-2",
  },

  {
    id: 13,
    image: "/images/IMG_3327.JPG",
    title: "Stylish Passage Way",
    description:
      "Aesthetic corridor design with warm lighting and elegant flooring.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 14,
    image: "/images/IMG_3329.JPG",
    title: "Outdoor Courtyard",
    description:
      "Open space courtyard offering a refreshing and peaceful vibe.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 15,
    image: "/images/IMG_3330.JPG",
    title: "Terrace Flooring Area",
    description:
      "Beautifully designed terrace space for relaxation and gatherings.",
    className: "md:col-span-1 md:row-span-1",
  },

  {
    id: 16,
    image: "/images/IMG_3332 (1).JPG",
    title: "Premium Room Variant",
    description: "A well-lit modern room offering comfort and elegance.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 17,
    image: "/images/IMG_3332.JPG",
    title: "Luxury Room Angle",
    description: "Another elegant perspective of premium room interiors.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 18,
    image: "/images/IMG_3333.JPG",
    title: "Entrance Lobby Detail",
    description: "Modern lobby design with stylish lighting and decor.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 19,
    image: "/images/IMG_3334.JPG",
    title: "Reception Corridor",
    description: "A refined space connecting main areas of the hotel.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 20,
    image: "/images/IMG_3336.JPG",
    title: "Premium Dining Setup",
    description: "Elegant dining area designed for a fine experience.",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 21,
    image: "/images/IMG_3337.JPG",
    title: "Restaurant Ambience",
    description: "Warm and inviting dining atmosphere for guests.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 22,
    image: "/images/IMG_3339.JPG",
    title: "Fine Dining Interior",
    description: "Sophisticated dining space with modern luxury design.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 23,
    image: "/images/IMG_3340.JPG",
    title: "Kitchen Service Area",
    description:
      "Clean and professional kitchen setup ensuring quality service.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 24,
    image: "/images/IMG_3341.JPG",
    title: "Dining Counter View",
    description: "Modern serving counter with elegant presentation style.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 25,
    image: "/images/IMG_3342.JPG",
    title: "Hallway Perspective",
    description: "Long corridor showcasing hotel architecture flow.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 26,
    image: "/images/IMG_3343.JPG",
    title: "Interior Passage",
    description: "Clean and minimal passage with premium finish.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 27,
    image: "/images/IMG_3344.JPG",
    title: "Room Corridor View",
    description: "Stylish corridor leading to private rooms.",
    className: "md:col-span-1 md:row-span-1",
  },

  {
    id: 28,
    image: "/images/IMG_3348.JPG",
    title: "Hotel Building Exterior",
    description: "Modern architecture showcasing premium hospitality design.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 29,
    image: "/images/IMG_3349.JPG",
    title: "Front Elevation View",
    description: "Clean and elegant front view of the property.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 30,
    image: "/images/IMG_3351.JPG",
    title: "Side Building View",
    description: "Architectural side angle showing structure depth.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 31,
    image: "/images/IMG_3353.JPG",
    title: "Hotel Signage Exterior",
    description: "Brand identity displayed on premium building facade.",
    className: "md:col-span-1 md:row-span-2",
  },

  {
    id: 32,
    image: "/images/room.webp",
    title: "Luxury Bedroom Setup",
    description: "Modern luxury room with elegant lighting and decor.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 33,
    image: "/images/room3.webp",
    title: "Premium Suite Design",
    description: "Spacious suite designed for comfort and relaxation.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 34,
    image: "/images/room4.webp",
    title: "Elegant Room Lighting",
    description: "Warm ambient lighting enhancing room aesthetics.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 35,
    image: "/images/room5.png",
    title: "Modern Hotel Room",
    description: "Clean and stylish room with premium furnishings.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 36,
    image: "/images/room6.png",
    title: "Luxury Suite Interior",
    description: "High-end suite designed for a premium guest experience.",
    className: "md:col-span-2 md:row-span-1",
  },
];

const ITEMS_PER_PAGE = 6;

const GalleryItem = ({ item }: { item: any }) => {
  const ref = useGsapReveal("scale");

  return (
    <div
      ref={ref as any}
      className={`group relative overflow-hidden ${item.className}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div
        className="
          absolute bottom-0 left-0 right-0 p-6
          translate-y-8 group-hover:translate-y-0
          transition-all duration-500
        "
      >
        <div
          className="
            inline-flex items-center
            px-3 py-1 mb-3
            text-xs uppercase tracking-[0.3em]
            bg-primary/20 text-primary
            backdrop-blur-xl border border-primary/20
          "
        >
          Hotel Blu Plaza
        </div>

        <h3 className="text-white text-2xl font-heading mb-2">
          {item.title}
        </h3>

        <p
          className="
            text-white/80 leading-7
            opacity-0 group-hover:opacity-100
            transition-all duration-500
          "
        >
          {item.description}
        </p>
      </div>
    </div>
  );
};

const GalleryStatCard = ({ value, label }: { value: string; label: string }) => {
  const ref = useGsapReveal("scale");

  return (
    <div
      ref={ref as any}
      className="text-center border border-border p-8 bg-card hover:border-primary/40 transition-colors duration-300"
    >
      <h3 className="text-4xl font-heading text-primary mb-2">
        {value}
      </h3>

      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

export const GallerySection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const galleryRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(galleryImages.length / ITEMS_PER_PAGE);

  const currentImages = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return galleryImages.slice(start, end);
  }, [currentPage]);

  const changePage = (page: number) => {
    setCurrentPage(page);

    galleryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <section
        ref={galleryRef}
        className="py-10 md:py-20 bg-background overflow-hidden"
      >
        <div className="max-w-content-area w-[90%] mx-auto">
          <SectionHeading
            tag="Luxury Experience"
            title="Explore Our Gallery"
            description="Discover the elegance, luxury and unforgettable experiences waiting for you at Hotel Blu Plaza."
          />

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] gap-5">
            {currentImages.map((item) => (
              <GalleryItem key={item.id} item={item} />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {[
              ["150+", "Luxury Rooms"],
              ["12K+", "Happy Guests"],
              ["4.9★", "Average Rating"],
              ["24/7", "Guest Support"],
            ].map(([value, label]) => (
              <GalleryStatCard key={label} value={value} label={label} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-16">
              <button
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className="
                  h-12 w-12 border border-border bg-card
                  flex items-center justify-center
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  hover:bg-primary hover:text-white
                  cursor-pointer
                  transition-all duration-300
                "
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`
                      h-12 w-12 border transition-all duration-300 cursor-pointer
                      ${
                        currentPage === page
                          ? "bg-primary text-white border-primary"
                          : "bg-card border-border hover:bg-primary hover:text-white"
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
                className="
                  h-12 w-12 border border-border bg-card
                  flex items-center justify-center
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  hover:bg-primary hover:text-white
                  transition-all duration-300
                  cursor-pointer
                "
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      <SuggestedRoom />
    </>
  );
};
