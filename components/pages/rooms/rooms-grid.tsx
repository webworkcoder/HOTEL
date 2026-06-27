"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RoomCard } from "@/components/shared/room-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { rooms } from "@/data/rooms";

// const rooms = [
//   {
//     id: "1",
//     title: "Luxury Suite",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 12000,
//   },
//   {
//     id: "2",
//     title: "Presidential Suite",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 25000,
//   },
//   {
//     id: "3",
//     title: "Deluxe Room",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 15000,
//   },
//   {
//     id: "4",
//     title: "Standard Room",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 9000,
//   },
//   {
//     id: "5",
//     title: "Family Suite",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 18000,
//   },
//   {
//     id: "6",
//     title: "Executive Room",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 11000,
//   },
//   {
//     id: "7",
//     title: "Royal Suite",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 30000,
//   },
//   {
//     id: "8",
//     title: "Ocean View Room",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 17000,
//   },
//   {
//     id: "9",
//     title: "Premium Suite",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 22000,
//   },
//   {
//     id: "10",
//     title: "Deluxe King Room",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 16000,
//   },
//   {
//     id: "11",
//     title: "Garden View Room",
//     image: "/images/gallery.JPG",
//     location: "Hotel Blu Plaza",
//     price: 14000,
//   },
// ];

const ITEMS_PER_PAGE = 8;

export const RoomsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rooms.length / ITEMS_PER_PAGE);

  const currentRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return rooms.slice(startIndex, endIndex);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <section className="py-10 lg:py-20 bg-background">
      <div className="max-w-content-area w-[90%] mx-auto">
        <SectionHeading
          tag="Our Rooms"
          title="Choose Your Perfect Stay"
          description="Browse our luxury rooms and suites designed to provide elegance, comfort and unforgettable experiences."
        />

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-14">
          {currentRooms.map((room) => (
            <RoomCard key={room.id} {...room} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-16 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="
              h-12 w-12
              flex items-center justify-center
              border border-border
              bg-card
              text-foreground
              transition-all duration-300
              hover:bg-primary hover:text-primary-foreground hover:border-primary
              disabled:opacity-40
              disabled:cursor-not-allowed
              disabled:hover:bg-card
              disabled:hover:text-foreground
              disabled:hover:border-border
            "
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = currentPage === page;

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  h-12 w-12
                  border
                  font-medium
                  transition-all duration-300
                  ${
                    isActive
                      ? `
                        bg-primary
                        text-primary-foreground
                        border-primary
                        scale-110
                        shadow-lg
                        shadow-primary/20
                      `
                      : `
                        bg-card
                        border-border
                        text-foreground
                        hover:bg-primary
                        hover:text-primary-foreground
                        hover:border-primary
                      `
                  }
                `}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="
              h-12 w-12
              flex items-center justify-center
              border border-border
              bg-card
              text-foreground
              transition-all duration-300
              hover:bg-primary hover:text-primary-foreground hover:border-primary
              disabled:opacity-40
              disabled:cursor-not-allowed
              disabled:hover:bg-card
              disabled:hover:text-foreground
              disabled:hover:border-border
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <div className="px-5 py-3 bg-secondary/40 border border-border text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-primary">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>
            {" - "}
            <span className="font-semibold text-primary">
              {Math.min(currentPage * ITEMS_PER_PAGE, rooms.length)}
            </span>
            {" of "}
            <span className="font-semibold text-primary">
              {rooms.length}
            </span>{" "}
            rooms
          </div>
        </div>
      </div>
    </section>
  );
};
