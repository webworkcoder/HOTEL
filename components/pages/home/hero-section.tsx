import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-section-hotel.JPG')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 sm:px-8">
        <div className="max-w-5xl text-center flex flex-col items-center gap-6 md:gap-8">
          {/* Subtitle */}
          <span className="uppercase tracking-[0.25em] sm:tracking-[0.4em] text-primary text-xs sm:text-sm font-medium">
            Welcome To Hotel Blu Plaza
          </span>

          {/* Title */}
          <h1 className="font-heading text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
            Experience Luxury
            <br />
            Beyond Expectations
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-7 sm:leading-8 px-2">
            Discover premium rooms, exceptional hospitality, and unforgettable
            experiences in the heart of the city. Your perfect stay begins here.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="rounded-none px-8 md:px-10 py-6 md:py-7 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
            >
              <Link href="/rooms">Explore Rooms</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none px-8 md:px-10 py-6 md:py-7 border-white text-white bg-transparent hover:bg-white hover:text-black w-full sm:w-auto"
            >
              <Link href="/availability">Check Availability</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 md:flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-muted text-sm md:text-base bg-white/10 backdrop-blur-md px-5 py-3 border border-white/20 hidden">
        <p className="font-medium">6.3k+ Bookings</p>

        <div className="hidden sm:block w-px h-5 bg-white/30" />

        <p className="flex items-center gap-2 font-medium">
          4.9/5
          <Star className="text-yellow-300 fill-yellow-300" size={18} />
          3.5k Reviews
        </p>
      </div>
    </section>
  );
};
