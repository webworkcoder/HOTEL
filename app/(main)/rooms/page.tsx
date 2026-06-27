import { WhyChooseUs } from "@/components/pages/about/why-choose-us";
import { FAQSection } from "@/components/pages/contact/faq-section";
import { Facilities } from "@/components/pages/home/facilities";
import { RoomCollection } from "@/components/pages/home/room-collection";
import { Testimonials } from "@/components/pages/home/testimonials";
import { RoomsFilter } from "@/components/pages/rooms/rooms-filter";
import { RoomsGrid } from "@/components/pages/rooms/rooms-grid";
import { PageBanner } from "@/components/shared/page-banner";

export default function RoomsPage() {
  return (
    <>
      <PageBanner
        title="Rooms & Suites"
        description="Discover elegant rooms and luxurious suites designed for comfort, sophistication and unforgettable experiences."
        image="/images/room6.png"
      />

      <RoomsFilter />
      <RoomCollection />
      <RoomsGrid />
      <Facilities />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
    </>
  );
}
