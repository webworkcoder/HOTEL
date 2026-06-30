/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { RoomCard } from "@/components/shared/room-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { api } from "@/lib/endpoints";

const ITEMS_PER_PAGE = 8;

export const RoomsGrid = ({ filters }: { filters: any }) => {
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

  const filteredRooms = useMemo(() => {
    return roomsList.filter((room) => {
      if (filters.roomType !== "All") {
        const typeMapping: Record<string, string> = {
          "Standard Room": "STANDARD",
          "Deluxe Room": "DELUXE",
          "Luxury Suite": "SUITE",
          "Presidential Suite": "PRESIDENTIAL",
        };
        const mappedType = typeMapping[filters.roomType];
        if (mappedType && room.roomType !== mappedType) {
          return false;
        }
      }

      if (filters.acNonAc !== "All") {
        const hasAC = room.amenities?.some(
          (amenity: string) =>
            amenity.toLowerCase().includes("air conditioning") ||
            amenity.toLowerCase() === "ac",
        );
        if (filters.acNonAc === "AC" && !hasAC) return false;
        if (filters.acNonAc === "Non-AC" && hasAC) return false;
      }

      if (filters.guestsCount) {
        const count = parseInt(filters.guestsCount, 10);
        if (!isNaN(count)) {
          const totalCapacity = (room.maxAdults || 0) + (room.maxChildren || 0);
          if (totalCapacity < count) return false;
        }
      }

      return true;
    });
  }, [roomsList, filters]);

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);

  const currentRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredRooms.slice(startIndex, endIndex);
  }, [currentPage, filteredRooms]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <section className="py-10 lg:py-20 bg-background">
      <div className="max-w-content-area w-[90%] mx-auto">
        <SectionHeading
          tag="Luxury Stays"
          title="Find Your Perfect Room"
          description="Explore our thoughtfully designed rooms and suites that blend elegance, comfort, and a truly memorable hospitality experience."
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-center mt-10 text-sm">
            Failed to load rooms: {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm font-medium">
              Loading luxury rooms...
            </p>
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
                  {filteredRooms.length === 0
                    ? 0
                    : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>
                {" - "}
                <span className="font-semibold text-primary">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredRooms.length)}
                </span>
                {" of "}
                <span className="font-semibold text-primary">
                  {filteredRooms.length}
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
