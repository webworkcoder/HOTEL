import { SectionHeading } from "@/components/shared/section-heading";
import {
  ShieldCheck,
  Wifi,
  UtensilsCrossed,
  Car,
  Dumbbell,
  ConciergeBell,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure Stay",
    number: "01",
    description:
      "Advanced security systems, smart access and trained staff ensure complete peace of mind during your stay.",
  },
  {
    icon: Wifi,
    title: "High Speed WiFi",
    number: "02",
    description:
      "Seamless connectivity with complimentary high-speed internet throughout the property.",
  },
  {
    icon: UtensilsCrossed,
    title: "Premium Dining",
    number: "03",
    description:
      "Experience fine dining crafted by experienced chefs using fresh ingredients.",
  },
  {
    icon: Car,
    title: "Parking Facility",
    number: "04",
    description:
      "Spacious and secure parking with valet service available for guests.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    number: "05",
    description:
      "State-of-the-art gym facilities to keep your routine uninterrupted.",
  },
  {
    icon: ConciergeBell,
    title: "24/7 Concierge",
    number: "06",
    description:
      "Dedicated hospitality team available around the clock for assistance.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-10 lg:py-20 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-[120px]" />

      <div className="relative max-w-content-area w-[90%] mx-auto">
        <SectionHeading
          tag="Why Choose Us"
          title="Luxury hospitality designed around comfort and elegance."
          description="Every experience at Hotel Blu Plaza is thoughtfully curated to provide comfort, sophistication and memorable stays."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  relative
                  overflow-hidden
                  border
                  border-border
                  bg-card/80
                  backdrop-blur-xl
                  p-8
                  transition-all
                  duration-500
                  hover:-translate-y-3
                  hover:border-primary/40
                  hover:shadow-[0_25px_60px_rgba(197,162,122,0.15)]
                "
              >
                {/* Number */}
                <span
                  className="
                    absolute
                    top-6
                    right-6
                    text-6xl
                    font-bold
                    text-primary/10
                    group-hover:text-primary/20
                    transition-all
                    duration-500
                  "
                >
                  {feature.number}
                </span>

                {/* Icon */}
                <div
                  className="
                    w-18
                    h-18
                    mb-8
                    text-primary
                    flex
                    items-center
                    justify-center
                    group-hover:scale-110
                    group-hover:rotate-6
                    transition-all
                    duration-500
                  "
                >
                  <Icon size={32} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-heading mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-8 mb-8">
                  {feature.description}
                </p>

                {/* Bottom Line */}
                <div className="flex items-center justify-between">
                  <div className="h-[2px] w-16 bg-border group-hover:w-28 group-hover:bg-primary transition-all duration-500" />

                  <ArrowUpRight
                    className="
                      text-primary
                      opacity-0
                      translate-x-5
                      group-hover:opacity-100
                      group-hover:translate-x-0
                      transition-all
                      duration-500
                    "
                    size={22}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
