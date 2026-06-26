import { SectionHeading } from "@/components/shared/section-heading";
import Image from "next/image";
import { SuggestedRoom } from "../home/suggested-room";
import { Testimonials } from "../home/testimonials";

const galleryImages = [
  {
    id: 1,
    image: "/images/gallery.JPG",
    title: "Luxury Suite",
    description: "Elegant interiors with premium comfort.",
    className: "col-span-2 row-span-2",
  },
  {
    id: 2,
    image: "/images/gallery.JPG",
    title: "Fine Dining",
    description: "World-class dining experience.",
    className: "col-span-1 row-span-1",
  },
  {
    id: 3,
    image: "/images/gallery.JPG",
    title: "Swimming Pool",
    description: "Relax with breathtaking views.",
    className: "col-span-1 row-span-1",
  },
  {
    id: 4,
    image: "/images/gallery.JPG",
    title: "Presidential Suite",
    description: "Experience unmatched luxury.",
    className: "col-span-1 row-span-2",
  },
  {
    id: 5,
    image: "/images/gallery.JPG",
    title: "Spa & Wellness",
    description: "Refresh your body and mind.",
    className: "col-span-2 row-span-1",
  },
];

export const GallerySection = () => {
  return (
    <>
      <section className="py-10 md:py-20 bg-background overflow-hidden">
        <div className="max-w-content-area w-[90%] mx-auto">
          <SectionHeading
            tag="Luxury Experience"
            title="Explore Our Gallery"
            description="Discover the elegance, luxury and unforgettable experiences waiting for you at Hotel Blu Plaza."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] gap-5">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className={`
                group
                relative
                overflow-hidden
                ${item.className}
              `}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
                />

                {/* Overlay */}
                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                "
                />

                {/* Content */}
                <div
                  className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-6
                  translate-y-8
                  group-hover:translate-y-0
                  transition-all
                  duration-500
                "
                >
                  <div
                    className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    mb-3
                    text-xs
                    uppercase
                    tracking-[0.3em]
                    bg-primary/20
                    text-primary
                    backdrop-blur-xl
                    border
                    border-primary/20
                  "
                  >
                    Hotel Blu Plaza
                  </div>

                  <h3 className="text-white text-2xl font-heading mb-2">
                    {item.title}
                  </h3>

                  <p
                    className="
                    text-white/80
                    leading-7
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                  "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            <div className="text-center border border-border p-8 rounded-[30px] bg-card">
              <h3 className="text-4xl font-heading text-primary mb-2">150+</h3>
              <p className="text-muted-foreground">Luxury Rooms</p>
            </div>

            <div className="text-center border border-border p-8 rounded-[30px] bg-card">
              <h3 className="text-4xl font-heading text-primary mb-2">12K+</h3>
              <p className="text-muted-foreground">Happy Guests</p>
            </div>

            <div className="text-center border border-border p-8 rounded-[30px] bg-card">
              <h3 className="text-4xl font-heading text-primary mb-2">4.9★</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </div>

            <div className="text-center border border-border p-8 rounded-[30px] bg-card">
              <h3 className="text-4xl font-heading text-primary mb-2">24/7</h3>
              <p className="text-muted-foreground">Guest Support</p>
            </div>
          </div>
        </div>
      </section>
      <SuggestedRoom />
    </>
  );
};
