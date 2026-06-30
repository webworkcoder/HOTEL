"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { RoomCard } from "@/components/shared/room-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { api } from "@/lib/endpoints";

const ITEMS_PER_PAGE = 8;

export const RoomsGrid = () => {
  const [roomsList, setRoomsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.rooms.getAll();
        setRoomsList((res as any)?.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load rooms");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const totalPages = Math.ceil(roomsList.length / ITEMS_PER_PAGE);

  const currentRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return roomsList.slice(startIndex, endIndex);
  }, [currentPage, roomsList]);

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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-center mt-10 text-sm">
            Failed to load rooms: {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm font-medium">Loading luxury rooms...</p>
          </div>
        ) : roomsList.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No rooms available at the moment. Please check back later!
          </div>
        ) : (
          <>
            {/* Rooms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-14">
              {currentRooms.map((room) => (
                <RoomCard key={room._id} id={room._id} {...room} />
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
              {Math.min(currentPage * ITEMS_PER_PAGE, roomsList.length)}
            </span>
            {" of "}
            <span className="font-semibold text-primary">
              {roomsList.length}
            </span>{" "}
            rooms
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  );
};
