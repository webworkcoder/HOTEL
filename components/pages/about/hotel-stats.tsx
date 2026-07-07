"use client";
import { useGsapReveal } from "@/hooks/useGsapReveal";

const stats = [
  {
    value: "150+",
    title: "Luxury Rooms",
  },
  {
    value: "12K+",
    title: "Happy Guests",
  },
  {
    value: "4.9",
    title: "Guest Rating",
  },
  {
    value: "24/7",
    title: "Support",
  },
];

const StatCard = ({ item }: { item: any }) => {
  const ref = useGsapReveal("scale");
  return (
    <div
      ref={ref as any}
      className="
        bg-card
        border
        border-border
        p-8
        text-center
        hover:border-primary/40
        transition-colors
        duration-300
      "
    >
      <h3 className="text-5xl text-primary font-heading mb-3">
        {item.value}
      </h3>

      <p className="text-muted-foreground">{item.title}</p>
    </div>
  );
};

export const HotelStats = () => {
  return (
    <section className="py-10 lg:py-20 bg-secondary/30">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <StatCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
