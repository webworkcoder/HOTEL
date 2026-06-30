import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";

export const AboutSection = () => {
  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative h-150 overflow-hidden">
              <Image
                src="/images/gallery.JPG"
                alt="Hotel Blu Plaza"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionHeading
              tag="Who We Are"
              title="Luxury hospitality crafted with passion and elegance."
              description=""
              align="left"
            />

            <div className="space-y-6 text-muted-foreground leading-8">
              <p>
                Hotel Blu Plaza is designed as a refined retreat where modern
                comfort blends seamlessly with warm hospitality and elegant
                living.
              </p>

              <p>
                Situated in a prime location, we offer thoughtfully designed
                rooms, premium amenities, and a peaceful atmosphere for both
                business and leisure travelers.
              </p>

              <p>
                Every space within the hotel reflects attention to detail — from
                sophisticated interiors to personalized guest services that
                enhance your stay experience.
              </p>

              <p>
                Whether you are here for work, relaxation, or celebration, Hotel
                Blu Plaza ensures a stay that feels comfortable, memorable, and
                truly elevated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
