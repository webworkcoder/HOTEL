"use client";

import { Search, Users, BedDouble } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RoomsFilter = () => {
  return (
    <section className="py-10  bg-secondary/20 border-y border-border">
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
            md:grid-cols-2
            lg:grid-cols-5
            gap-5
            shadow-sm
          "
        >
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Search Room</label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                placeholder="Luxury Suite"
                className="pl-11 h-12 rounded-none"
              />
            </div>
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Room Type</label>

            <select className="w-full h-12 border border-border bg-background px-4 outline-none">
              <option>All Rooms</option>
              <option>Standard Room</option>
              <option>Deluxe Room</option>
              <option>Luxury Suite</option>
              <option>Presidential Suite</option>
            </select>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Guests</label>

            <div className="relative">
              <Users
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                type="number"
                placeholder="2 Guests"
                className="pl-11 h-12 rounded-none"
              />
            </div>
          </div>

          {/* Bed */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Bed Type</label>

            <div className="relative">
              <BedDouble
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                placeholder="King Size"
                className="pl-11 h-12 rounded-none"
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex items-end">
            <Button className="w-full h-12 rounded-none">Search Rooms</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
