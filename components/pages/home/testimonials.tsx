"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const testimonials = [
  {
    id: 1,
    name: "Sophia Williams",
    location: "Delhi",
    rating: 5,
    review:
      "Exceptional hospitality and luxurious rooms. Every detail was carefully designed to provide a memorable experience.",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    location: "India",
    rating: 5,
    review:
      "Beautiful interiors, excellent food and outstanding customer service throughout our stay.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    location: "India",
    rating: 5,
    review:
      "One of the finest hotel experiences we've ever had. Highly recommended for luxury travelers.",
  },
  {
    id: 4,
    name: "Emily Johnson",
    location: "India",
    rating: 5,
    review:
      "One of the finest hotel experiences we've ever had. Highly recommended for luxury travelers.",
  },
  {
    id: 5,
    name: "Emily Johnson",
    location: "India",
    rating: 5,
    review:
      "One of the finest hotel experiences we've ever had. Highly recommended for luxury travelers.",
  },
  {
    id: 6,
    name: "Emily Johnson",
    location: "India",
    rating: 5,
    review:
      "One of the finest hotel experiences we've ever had. Highly recommended for luxury travelers.",
  },
];

export const Testimonials = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
      }),
    ],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-10 lg:py-20 bg-primary-foreground overflow-hidden">
      <div className="max-w-content-area w-[90%] mx-auto">
        <SectionHeading
          tag="Testimonials"
          title="What Our Guests Say"
          description="Experiences shared by our guests from around the world."
        />

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-[0_0_100%] min-w-0">
                <div className="max-w-4xl mx-auto text-center">
                  <Quote
                    className="mx-auto text-primary mb-8 opacity-40"
                    size={70}
                  />

                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({
                      length: testimonial.rating,
                    }).map((_, i) => (
                      <Star
                        key={i}
                        className="fill-primary text-primary"
                        size={18}
                      />
                    ))}
                  </div>

                  <p className="text-xl lg:text-3xl font-heading leading-relaxed mb-10">
                    &#34;{testimonial.review}&#34;
                  </p>

                  <div>
                    <h3 className="text-2xl font-semibold">
                      {testimonial.name}
                    </h3>

                    <p className="text-muted-foreground mt-2">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Progress Bar */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-3 w-full max-w-md">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="flex-1 h-[3px] bg-border overflow-hidden cursor-pointer"
              >
                <div
                  className={`
                    h-full bg-primary transition-all duration-700
                    ${
                      selectedIndex === index
                        ? "w-full"
                        : selectedIndex > index
                          ? "w-full"
                          : "w-0"
                    }
                  `}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
