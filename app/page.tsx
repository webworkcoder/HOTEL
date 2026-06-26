import { AboutHotel } from "@/components/pages/home/about-hotel";
import { Facilities } from "@/components/pages/home/facilities";
import { HeroSection } from "@/components/pages/home/hero-section";
import { RoomCollection } from "@/components/pages/home/room-collection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Facilities />
      <AboutHotel />
      <RoomCollection />
    </>
  );
};

export default HomePage;
