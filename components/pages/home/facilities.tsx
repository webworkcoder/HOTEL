"use client";
import { SectionHeading } from "@/components/shared/section-heading";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { MapPin, Bath, Users, BadgePercent } from "lucide-react";

const facilities = [
  {
    id: 1,
    title: "Prime City Location",
    description:
      "Perfectly situated in the heart of the city, offering seamless access to major attractions, business hubs, and transport links.",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Elegant & Contemporary Spaces",
    description:
      "Thoughtfully designed interiors combining modern aesthetics with luxurious comfort for a refined stay experience.",
    icon: Bath,
  },
  {
    id: 3,
    title: "Warm & Attentive Hospitality",
    description:
      "Our dedicated team ensures personalized service with genuine care, making every guest feel truly welcomed.",
    icon: Users,
  },
  {
    id: 4,
    title: "Exceptional Value & Exclusive Offers",
    description:
      "Enjoy premium stays at competitive rates with special deals crafted to enhance your experience.",
    icon: BadgePercent,
  },
];

export const Facilities = () => {
  const ref = useGsapReveal("fadeUp");
  return (
    <section className="py-10 lg:py-20 bg-primary-foreground">
      <div className="max-w-content-area w-[90%] mx-auto">
        <SectionHeading
          tag="Why Choose Us"
          title="Experience Comfort, Luxury & Exceptional Hospitality"
          description="Discover why thousands of guests choose Hotel Blu Plaza for unforgettable experiences and premium comfort."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border border-border overflow-hidden bg-card">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;

            return (
              <div
                ref={ref}
                key={facility.id}
                className={`
                  flex flex-col items-center text-center px-8 py-12
                  transition-all duration-300
                  hover:bg-secondary/50
                  hover:-translate-y-1
                  relative
                  ${
                    index !== facilities.length - 1
                      ? "xl:border-r border-border"
                      : ""
                  }
                  ${index < 2 ? "sm:border-b xl:border-b-0 border-border" : ""}
                `}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110">
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                <h3 className="font-heading text-xl mb-4 max-w-55 leading-snug">
                  {facility.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-7 max-w-62.5">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
