"use client";
import { SectionHeading } from "@/components/shared/section-heading";
import { useGsapReveal } from "@/hooks/useGsapReveal";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using Hotel Blu Plaza services, you agree to comply with these terms and conditions and all applicable laws and regulations.",
  },
  {
    title: "Reservation Policy",
    content:
      "Room reservations are subject to availability and confirmation by the hotel. Guests are required to provide accurate information during booking.",
  },
  {
    title: "Check-in and Check-out",
    content:
      "Standard check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in and late check-out are subject to availability.",
  },
  {
    title: "Payment Policy",
    content:
      "Guests may be required to provide advance payment or valid payment details to secure reservations. Additional charges may apply for extra services.",
  },
  {
    title: "Cancellation Policy",
    content:
      "Cancellation requests must be made within the specified cancellation period. Refund eligibility depends on the selected booking policy.",
  },
  {
    title: "Guest Responsibilities",
    content:
      "Guests are responsible for maintaining hotel property and complying with all hotel rules during their stay.",
  },
  {
    title: "Property Damage",
    content:
      "Any damage caused to hotel property by guests may result in additional charges for repair or replacement.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Hotel Blu Plaza shall not be held liable for loss, theft, or damage to guest belongings unless required by applicable law.",
  },
  {
    title: "Modification of Terms",
    content:
      "We reserve the right to update or modify these terms and conditions at any time without prior notice.",
  },
];

const TermsCard = ({ section, index }: { section: any; index: number }) => {
  const ref = useGsapReveal("fadeUp");

  return (
    <div
      ref={ref as any}
      className="border border-border p-8 bg-card hover:border-primary/40 transition-colors duration-300"
    >
      <div className="flex items-start gap-5">
        <div className="min-w-14 h-14 bg-primary text-white flex items-center justify-center text-xl font-bold">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div>
          <h3 className="text-2xl font-heading mb-4">
            {section.title}
          </h3>

          <p className="text-muted-foreground leading-8">
            {section.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsConditionSection = () => {
  const footerRef = useGsapReveal("fadeUp");

  return (
    <section className="py-10 lg:py-20 overflow-hidden">
      <div className="max-w-content-area w-[90%] mx-auto">
        <SectionHeading
          tag="Legal Information"
          title="Terms & Conditions"
          description="These terms govern your use of our services and ensure a comfortable experience for all guests."
        />

        <div className="mt-14 space-y-8">
          {sections.map((section, index) => (
            <TermsCard key={section.title} section={section} index={index} />
          ))}
        </div>

        <div
          ref={footerRef as any}
          className="mt-12 border border-primary/20 bg-primary/5 p-8"
        >
          <p className="text-muted-foreground leading-8">
            By using our website and services, you acknowledge that you have
            read, understood, and agreed to these Terms and Conditions.
          </p>
        </div>
      </div>
    </section>
  );
};
