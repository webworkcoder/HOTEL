import { ContactInfo } from "@/components/pages/contact/contact-info";
import { ContactSection } from "@/components/pages/contact/contact-section";
import { FAQSection } from "@/components/pages/contact/faq-section";
import { HotelMap } from "@/components/pages/contact/hotel-map";
import { SuggestedRoom } from "@/components/pages/home/suggested-room";
import { Testimonials } from "@/components/pages/home/testimonials";
import { PageBanner } from "@/components/shared/page-banner";

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        description="We are always ready to assist you with reservations, inquiries and personalized hospitality services."
        image="/images/room6.png"
      />

      <ContactInfo />
      <ContactSection />
      <HotelMap />
      <FAQSection />
      <Testimonials/>
      <SuggestedRoom />
    </>
  );
}
