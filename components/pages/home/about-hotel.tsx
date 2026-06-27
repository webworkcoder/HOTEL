"use client";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGsapReveal } from "@/hooks/useGsapReveal";

const reviews = [
  {
    id: 1,
    logo: "B.",
    rating: "4.9/5",
    label: "Excellent",
    reviews: "3.5K Reviews on Booking",
  },
  {
    id: 2,
    logo: "A",
    rating: "5/5",
    label: "Excellent",
    reviews: "4.1K Reviews on Agoda",
  },
  {
    id: 3,
    logo: <Star className="w-5 h-5 text-primary fill-primary" />,
    rating: "4.8/5",
    label: "Excellent",
    reviews: "2.4K Reviews on Tripadvisor",
  },
];

export const AboutHotel = () => {
  const leftImageRef = useGsapReveal("fadeLeft");
  const rightImageRef = useGsapReveal("fadeRight");
  const tagRef = useGsapReveal("fadeUp");
  const titleRef = useGsapReveal("luxuryText");
  const descRef = useGsapReveal("blurReveal");
  const buttonRef = useGsapReveal("fadeUp");
  return (
    <section className="py-10 lg:py-20 overflow-hidden bg-primary-foreground">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-137.5 h-112.5">
              {/* Left Image */}
              <div
                className="absolute left-0 bottom-0 w-[46%] h-[75%] overflow-hidden shadow-2xl z-10"
                ref={leftImageRef}
              >
                <Image
                  src="/images/room6.png"
                  alt="Luxury Hotel Room"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Right Image */}
              <div
                className="absolute right-0 top-0 w-[50%] h-[85%] overflow-hidden shadow-2xl"
                ref={rightImageRef}
              >
                <Image
                  src="/images/room5.png"
                  alt="Luxury Suite"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <span
              className="uppercase tracking-[0.35em] text-primary text-sm font-semibold mb-5"
              ref={tagRef}
            >
              Welcome To Hotel Blu Plaza
            </span>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight mb-6"
              ref={titleRef}
            >
              Luxury hotel in the heart of the city.
            </h2>

            <p className="text-muted-foreground leading-8 mb-8" ref={titleRef}>
              Hotel Blu Plaza offers premium accommodation with elegant rooms,
              exceptional hospitality and world-class facilities. Experience
              unforgettable stays with personalized service, modern interiors,
              and breathtaking city views.
            </p>

            <div ref={buttonRef}>
              <Link href={"/about"}>
                <Button className="w-fit rounded-none px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-20 border-t border-border pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-primary">
                  {review.logo}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xl">
                      {review.rating}
                    </span>

                    <span className="text-primary text-sm font-medium">
                      {review.label}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mt-1">
                    {review.reviews}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
