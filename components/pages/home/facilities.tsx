import { SectionHeading } from "@/components/shared/section-heading";
import { MapPin, Bath, Users, BadgePercent } from "lucide-react";

const facilities = [
  {
    id: 1,
    title: "Located in the Heart of the City",
    description:
      "Ideally located in the city's heart for easy access and convenience.",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Luxurious, Modern and Comfortable",
    description:
      "Experience a luxurious, modern and fully equipped space for comfort.",
    icon: Bath,
  },
  {
    id: 3,
    title: "Friendly and Welcoming Staff",
    description:
      "Our professional team ensures a delightful stay every single time.",
    icon: Users,
  },
  {
    id: 4,
    title: "Best Prices and Great Offers",
    description:
      "Enjoy unbeatable prices with exclusive deals tailored for you.",
    icon: BadgePercent,
  },
];

export const Facilities = () => {
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
