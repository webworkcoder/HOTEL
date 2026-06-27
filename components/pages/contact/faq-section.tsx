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
    question: "What are the check-in and check-out timings?",
    answer:
      "Guests can check in from 2:00 PM onwards and check out until 11:00 AM. Early check-in and late check-out are subject to availability.",
  },
  {
    question: "Do you provide airport pickup and drop services?",
    answer:
      "Yes, we offer airport pickup and drop services for our guests at an additional charge. Please contact us in advance to arrange transportation.",
  },
  {
    question: "Is breakfast included with the room booking?",
    answer:
      "Breakfast availability depends on the room package selected during booking. Complimentary breakfast is included in selected room categories.",
  },
  {
    question: "Do you have free WiFi throughout the property?",
    answer:
      "Yes, complimentary high-speed WiFi is available in all rooms, suites and public areas of the hotel.",
  },
  {
    question: "Are pets allowed inside the hotel?",
    answer:
      "Currently, pets are allowed only in selected room categories. Please contact our team before making your reservation.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, bookings can be modified or cancelled according to the cancellation policy selected during reservation.",
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
