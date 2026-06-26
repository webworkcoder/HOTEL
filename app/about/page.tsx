import { AboutSection } from "@/components/pages/about/about-section";
import { HotelStats } from "@/components/pages/about/hotel-stats";
import { MissionVision } from "@/components/pages/about/mission-vision";
import { WhyChooseUs } from "@/components/pages/about/why-choose-us";
import { Facilities } from "@/components/pages/home/facilities";
import { Testimonials } from "@/components/pages/home/testimonials";
import { PageBanner } from "@/components/shared/page-banner";

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Hotel Blu Plaza"
        description="Luxury accommodation designed for comfort, elegance and unforgettable experiences."
        image="/images/gallery.JPG"
      />

      <AboutSection />
      <HotelStats />
      <WhyChooseUs />
      <Facilities />
      <MissionVision />
      <Testimonials />
    </>
  );
}
