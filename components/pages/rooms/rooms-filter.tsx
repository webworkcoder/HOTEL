"use client";

import { useState, useEffect } from "react";
import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RoomsFilterProps {
  filters: {
    roomType: string;
    acNonAc: string;
    guestsCount: string;
  };
  onChange: (filters: any) => void;
}

export const RoomsFilter = ({ filters, onChange }: RoomsFilterProps) => {
  const [localRoomType, setLocalRoomType] = useState(filters.roomType);
  const [localAcNonAc, setLocalAcNonAc] = useState(filters.acNonAc);
  const [localGuestsCount, setLocalGuestsCount] = useState(filters.guestsCount);

  // Keep local state in sync if filters are reset externally
  useEffect(() => {
    setLocalRoomType(filters.roomType);
    setLocalAcNonAc(filters.acNonAc);
    setLocalGuestsCount(filters.guestsCount);
  }, [filters]);

  const handleSearch = () => {
    onChange({
      roomType: localRoomType,
      acNonAc: localAcNonAc,
      guestsCount: localGuestsCount,
    });
  };

  const handleReset = () => {
    setLocalRoomType("All");
    setLocalAcNonAc("All");
    setLocalGuestsCount("");
    onChange({
      roomType: "All",
      acNonAc: "All",
      guestsCount: "",
    });
  };

  return (
    <section className="py-10 bg-secondary/20 border-y border-border">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div
          className="
            bg-card/80
            backdrop-blur-xl
            border
            border-border
            p-6 lg:p-8
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            gap-5
            shadow-sm
          "
        >
          {/* Room Type */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Room Type</label>

            <select
              value={localRoomType}
              onChange={(e) => setLocalRoomType(e.target.value)}
              className="w-full h-12 border border-border bg-background px-4 outline-none text-sm cursor-pointer focus:ring-1 focus:ring-primary"
            >
              <option value="All">All Rooms</option>
              <option value="Standard Room">Standard Room</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Luxury Suite">Luxury Suite</option>
              <option value="Presidential Suite">Presidential Suite</option>
            </select>
          </div>

          {/* AC / Non AC */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Climate Control (AC)</label>

            <select
              value={localAcNonAc}
              onChange={(e) => setLocalAcNonAc(e.target.value)}
              className="w-full h-12 border border-border bg-background px-4 outline-none text-sm cursor-pointer focus:ring-1 focus:ring-primary"
            >
              <option value="All">All Options</option>
              <option value="AC">Air Conditioning</option>
              <option value="Non-AC">Non-AC</option>
            </select>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Guests Count</label>

            <div className="relative">
              <Users
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                type="text"
                placeholder="Number of guests"
                value={localGuestsCount}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setLocalGuestsCount(e.target.value)}
                className="pl-11 h-12 rounded-none text-sm focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              className="w-full h-12 rounded-none cursor-pointer text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Search size={16} /> Search Rooms
            </Button>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-12 rounded-none cursor-pointer text-sm font-semibold border-primary/20 hover:bg-primary/5 transition-all"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
