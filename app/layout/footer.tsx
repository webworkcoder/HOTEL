import Link from "next/link";
import { MapPin, Phone, Mail, Clock3 } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#1f1c1a] text-muted overflow-hidden">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-content-area w-[90%] mx-auto py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="uppercase tracking-[0.35em] text-primary text-sm font-medium">
                Stay Updated
              </span>

              <h2 className="text-3xl lg:text-5xl font-heading mt-4 mb-4">
                Subscribe for Exclusive Offers
              </h2>

              <p className="text-white/60 max-w-xl leading-8">
                Receive special room discounts, seasonal offers and luxury stay
                experiences directly in your inbox.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="
                  flex-1
                  h-14
                  bg-white/5
                  border
                  border-white/10
                  px-5
                  outline-none
                  focus:border-primary
                  placeholder:text-white/40
                "
              />

              <button
                className="
                  h-14
                  px-8
                  bg-primary
                  text-primary-foreground
                  font-medium
                  hover:opacity-90
                  transition-all
                  cursor-pointer
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-content-area w-[90%] mx-auto py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <h2 className="text-4xl font-heading text-primary mb-5">
              Hotel Blu <span className="text-accent">Plaza</span>
            </h2>

            <p className="text-white/60 leading-8 mb-6">
              Experience luxury hospitality with premium rooms, elegant
              interiors and unforgettable memories.
            </p>

            <div className="flex gap-4">
              {[FaFacebook, FaInstagram, FaYoutube].map((Icon, index) => (
                <button
                  key={index}
                  className="
                      h-11
                      w-11
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      hover:bg-primary
                      hover:border-primary
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading mb-6 text-accent">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-white/60">
              <Link href="/">Home</Link>
              <Link href="/rooms">Rooms & Suites</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-heading mb-6 text-accent">Services</h3>

            <div className="flex flex-col gap-4 text-white/60">
              <p>Luxury Rooms</p>
              <p>Restaurant & Dining</p>
              <p>Spa & Wellness</p>
              <p>Conference Hall</p>
              <p>Airport Pickup</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-heading mb-6 text-accent">
              Contact Information
            </h3>

            <div className="space-y-5 text-white/60">
              <div className="flex gap-4">
                <MapPin className="text-primary mt-1" size={18} />
                <p>MG Road, New Delhi, India</p>
              </div>

              <div className="flex gap-4">
                <Phone className="text-primary mt-1" size={18} />
                <p>+91 9876543210</p>
              </div>

              <div className="flex gap-4">
                <Mail className="text-primary mt-1" size={18} />
                <p>info@hotelbluplaza.com</p>
              </div>

              <div className="flex gap-4">
                <Clock3 className="text-primary mt-1" size={18} />
                <p>24 Hours Reception Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-content-area w-[90%] mx-auto py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>
            © {new Date().getFullYear()} Hotel Blu Plaza. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="border-t border-white/5">
          <div className="max-w-content-area w-[90%] mx-auto py-5 text-center text-sm text-white/40">
            Designed & Developed by{" "}
            <Link
              href="https://www.axvionel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Axvionel Digital Private Limited
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
