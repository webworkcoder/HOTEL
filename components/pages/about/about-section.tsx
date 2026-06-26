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
                Hotel Blu Plaza was founded with a simple vision: to create a
                place where comfort meets elegance and every guest feels truly
                valued.
              </p>

              <p>
                Located in the heart of the city, our hotel offers premium
                rooms, exceptional hospitality and world-class amenities
                carefully designed to provide memorable experiences.
              </p>

              <p>
                From luxury suites and fine dining to wellness facilities and
                personalized services, every detail has been thoughtfully
                crafted for modern travelers.
              </p>

              <p>
                Whether you are visiting for business, leisure or celebrations,
                Hotel Blu Plaza ensures every stay becomes a cherished memory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
