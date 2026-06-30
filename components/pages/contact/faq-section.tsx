"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";

const faq = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Check-in begins at 2:00 PM and check-out is available until 11:00 AM. Early arrival or extended stay may be arranged based on availability.",
  },
  {
    question: "Do you offer airport transfer services?",
    answer:
      "Yes, we provide convenient airport pickup and drop services on request. Additional charges may apply, and advance booking is recommended.",
  },
  {
    question: "Is breakfast included in the stay?",
    answer:
      "Breakfast inclusion depends on the selected room package. Certain categories include complimentary breakfast as part of the stay experience.",
  },
  {
    question: "Is WiFi available at the property?",
    answer:
      "Yes, high-speed complimentary WiFi is available throughout the hotel, including guest rooms and common areas.",
  },
  {
    question: "Are pets allowed at the hotel?",
    answer:
      "Pets are permitted in selected room types only. We recommend contacting our team in advance to confirm pet-friendly availability.",
  },
  {
    question: "Can I modify or cancel my reservation?",
    answer:
      "Yes, bookings can be modified or cancelled according to the policy selected at the time of reservation. Terms may vary by rate plan.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-10 lg:py-20 bg-secondary/20">
      <div className="max-w-content-area w-[90%] mx-auto">
        <SectionHeading
          tag="Frequently Asked Questions"
          title="Everything you need to know before your stay."
          description="Find answers to the most common questions regarding reservations, facilities, services and hotel policies."
        />

        <div className="max-w-4xl mx-auto mt-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="
                  border
                  border-border
                  bg-card
                  px-6
                  py-2
                  transition-all
                  duration-300
                  hover:border-primary/40
                  data-[state=open]:border-primary
                "
              >
                <AccordionTrigger
                  className="
                    text-left
                    text-lg
                    font-heading
                    hover:no-underline
                    py-5
                    cursor-pointer
                  "
                >
                  {item.question}
                </AccordionTrigger>

                <AccordionContent
                  className="
                    text-muted-foreground
                    leading-8
                    pb-5
                  "
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
