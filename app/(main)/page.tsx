import { AboutHotel } from "@/components/pages/home/about-hotel";
import { Facilities } from "@/components/pages/home/facilities";
import { HeroSection } from "@/components/pages/home/hero-section";
import { RoomCollection } from "@/components/pages/home/room-collection";
import { SuggestedRoom } from "@/components/pages/home/suggested-room";
import { Testimonials } from "@/components/pages/home/testimonials";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Facilities />
      <AboutHotel />
      <SuggestedRoom />
      <RoomCollection />
      <Testimonials />
    </>
  );
};

export default HomePage;
