"use client";

import { useState } from "react";
import { WhyChooseUs } from "@/components/pages/about/why-choose-us";
import { FAQSection } from "@/components/pages/contact/faq-section";
import { Facilities } from "@/components/pages/home/facilities";
import { RoomCollection } from "@/components/pages/home/room-collection";
import { Testimonials } from "@/components/pages/home/testimonials";
import { RoomsFilter } from "@/components/pages/rooms/rooms-filter";
import { RoomsGrid } from "@/components/pages/rooms/rooms-grid";
import { PageBanner } from "@/components/shared/page-banner";

export default function RoomsPage() {
  const [filters, setFilters] = useState({
    roomType: "All",
    acNonAc: "All",
    guestsCount: "",
  });

  return (
    <>
      <PageBanner
        title="Elegant Rooms & Luxury Suites"
        description="Experience thoughtfully designed stays that blend comfort, sophistication, and world-class hospitality for truly memorable moments."
        image="/images/room6.png"
      />

      <RoomsFilter filters={filters} onChange={setFilters} />
      <RoomCollection />
      <RoomsGrid filters={filters} />
      <Facilities />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
    </>
  );
}
