import { MapPin, Phone, Mail, Clock } from "lucide-react";

const info = [
  {
    icon: MapPin,
    title: "Address",
    value: "Hotel Blu Plaza, MG Road, New Delhi, India",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 9876543210",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@hotelbluplaza.com",
  },
  {
    icon: Clock,
    title: "Reception",
    value: "24 Hours Available",
  },
];

export const ContactInfo = () => {
  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {info.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  border border-border
                  bg-card
                  p-8
                  hover:-translate-y-2
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
          })}
        </div>
      </div>
    </section>
  );
};
