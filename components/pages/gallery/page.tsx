"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { SuggestedRoom } from "../home/suggested-room";

const galleryImages = [
  {
    id: 1,
    image: "/images/gallery.JPG",
    title: "Luxury Suite",
    description: "Elegant interiors with premium comfort.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    image: "/images/gallery.JPG",
    title: "Fine Dining",
    description: "World-class dining experience.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    image: "/images/gallery.JPG",
    title: "Swimming Pool",
    description: "Relax with breathtaking views.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    image: "/images/gallery.JPG",
    title: "Presidential Suite",
    description: "Experience unmatched luxury.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 5,
    image: "/images/gallery.JPG",
    title: "Executive Lounge",
    description: "Premium comfort with private lounge access.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 6,
    image: "/images/gallery.JPG",
    title: "Spa & Wellness",
    description: "Refresh your body and mind.",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 7,
    image: "/images/gallery.JPG",
    title: "Luxury Suite",
    description: "Elegant interiors with premium comfort.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 8,
    image: "/images/gallery.JPG",
    title: "Fine Dining",
    description: "World-class dining experience.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 9,
    image: "/images/gallery.JPG",
    title: "Swimming Pool",
    description: "Relax with breathtaking views.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 10,
    image: "/images/gallery.JPG",
    title: "Presidential Suite",
    description: "Experience unmatched luxury.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 11,
    image: "/images/gallery.JPG",
    title: "Executive Lounge",
    description: "Premium comfort with private lounge access.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 12,
    image: "/images/gallery.JPG",
    title: "Spa & Wellness",
    description: "Refresh your body and mind.",
    className: "md:col-span-2 md:row-span-1",
  },
];

const ITEMS_PER_PAGE = 6;

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
              <div
                key={item.id}
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
              <div
                key={label}
                className="text-center border border-border p-8 bg-card"
              >
                <h3 className="text-4xl font-heading text-primary mb-2">
                  {value}
                </h3>

                <p className="text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
                      h-12 w-12 border transition-all duration-300
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
