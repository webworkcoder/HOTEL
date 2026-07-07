"use client";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useGsapReveal } from "@/hooks/useGsapReveal";

const info = [
  {
    icon: MapPin,
    title: "Address",
    value:
      " Santoshi Mata mandir ke samne, Hotel blu plaza, Hayatpur Rd, Sector 89, Gurugram, Haryana 122505",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 7011494881",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hotelblueplaza@gmail.com",
  },
  {
    icon: Clock,
    title: "Reception",
    value: "24 Hours Available",
  },
];

const InfoCard = ({ item }: { item: any }) => {
  const ref = useGsapReveal("scale");
  const Icon = item.icon;

  return (
    <div
      ref={ref as any}
      className="
        border border-border
        bg-card
        p-8
        hover:-translate-y-2
        hover:border-primary/40
        transition-all
        duration-300
      "
    >
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
        <Icon size={28} />
      </div>

      <h3 className="text-xl font-heading mb-3">{item.title}</h3>

      <p className="text-muted-foreground leading-7">{item.value}</p>
    </div>
  );
};

export const ContactInfo = () => {
  return (
    <section className="py-10 lg:py-20 overflow-hidden">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {info.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
