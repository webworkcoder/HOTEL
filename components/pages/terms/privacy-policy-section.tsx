"use client";
import { SectionHeading } from "@/components/shared/section-heading";
import { useGsapReveal } from "@/hooks/useGsapReveal";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We may collect personal information such as your name, email address, phone number, and booking details when you use our services.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information is used to process reservations, improve our services, communicate important updates, and enhance guest experiences.",
  },
  {
    title: "Payment Information",
    content:
      "Payment transactions are securely processed through trusted payment gateways. We do not store complete payment card details.",
  },
  {
    title: "Cookies and Tracking Technologies",
    content:
      "Our website may use cookies to improve user experience, analyze website traffic, and personalize content.",
  },
  {
    title: "Data Protection",
    content:
      "We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.",
  },
  {
    title: "Third-Party Services",
    content:
      "We may share necessary information with trusted service providers for booking management and payment processing purposes.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, modify, or request deletion of your personal information subject to applicable laws.",
  },
  {
    title: "Policy Updates",
    content:
      "We reserve the right to update this privacy policy periodically. Changes will be reflected on this page.",
  },
];

const PolicyCard = ({ section, index }: { section: any; index: number }) => {
  const ref = useGsapReveal("fadeUp");

  return (
    <div
      ref={ref as any}
      className="border border-border bg-card p-8 h-full hover:border-primary/40 transition-colors duration-300"
    >
      <span className="text-primary text-sm font-semibold tracking-[0.3em]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="text-2xl font-heading mt-4 mb-4">
        {section.title}
      </h3>

      <p className="text-muted-foreground leading-8">
        {section.content}
      </p>
    </div>
  );
};

export const PrivacyPolicySection = () => {
  const footerRef = useGsapReveal("fadeUp");

  return (
    <section className="py-10 lg:py-20 overflow-hidden">
      <div className="max-w-content-area w-[90%] mx-auto">
        <SectionHeading
          tag="Privacy & Security"
          title="Privacy Policy"
          description="We value your trust and are committed to protecting your personal information."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <PolicyCard key={section.title} section={section} index={index} />
          ))}
        </div>

        <div
          ref={footerRef as any}
          className="mt-12 border border-primary/20 bg-primary/5 p-8"
        >
          <p className="text-muted-foreground leading-8">
            If you have any questions regarding our privacy practices, please
            contact our support team for assistance.
          </p>
        </div>
      </div>
    </section>
  );
};
