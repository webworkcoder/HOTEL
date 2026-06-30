"use client";

import { Button } from "@/components/ui/button";
import {
  BedDouble,
  CalendarRange,
  Home,
  Images,
  Info,
  Menu,
  Phone,
  PhoneCall,
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNavbarAnimation } from "@/hooks/useNavbarAnimation";

interface InavLinks {
  id: number;
  label: string;
  path: string;
  icon: React.ElementType;
}

export const navLinks: InavLinks[] = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    id: 2,
    label: "Rooms",
    path: "/rooms",
    icon: BedDouble,
  },
  {
    id: 3,
    label: "Gallery",
    path: "/gallery",
    icon: Images,
  },
  {
    id: 4,
    label: "About",
    path: "/about",
    icon: Info,
  },
  {
    id: 5,
    label: "Contact",
    path: "/contact",
    icon: Phone,
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useNavbarAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={clsx(
          "fixed top-0 left-0 z-50 w-full transition-all duration-500",
          scrolled
            ? `
        bg-black/60
        backdrop-blur-xl
        shadow-lg
      `
            : `
        bg-transparent
      `,
        )}
      >
        <div className="max-w-content-area w-[90%] mx-auto py-5 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="
            group
            transition-all
            duration-500
  "
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
              Hotel Blu{" "}
              <span
                className="
                text-accent
                inline-block
                transition-transform
                duration-500
                group-hover:translate-x-1
    "
              >
                Plaza
              </span>
            </h2>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((navlink) => {
              const isActive = pathname === navlink.path;

              return (
                <Link
                  key={navlink.id}
                  href={navlink.path}
                  className={clsx(
                    `
                      nav-link
                      group
                      relative
                      text-sm
                      uppercase
                      tracking-[0.25em]
                      py-2
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]
  `,
                    isActive
                      ? "text-accent font-semibold drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]"
                      : "text-white hover:text-primary",
                  )}
                >
                  {navlink.label}

                  {isActive && (
                    <span className="absolute left-0 -bottom-2 h-0.5 w-full rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <Button
            onClick={() => router.push("/rooms")}
            className="
              hidden lg:flex
              rounded-none
              px-8
              py-6
              relative
              overflow-hidden
              group
              bg-primary
              hover:bg-primary
              cursor-pointer
              "
          >
            <span
              className="
              absolute
              inset-0
              bg-white/20
              translate-x-[-100%]
              group-hover:translate-x-[100%]
              transition-transform
              duration-700
              skew-x-12
              "
            />

            <CalendarRange size={18} />

            <span className="relative z-10">Reservation</span>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => (window.location.href = "tel:+919999984981")}
          >
            <PhoneCall size={30} />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full border border-white/10 bg-black/60 backdrop-blur-xl px-3 py-3">
        <div className="flex items-center justify-between">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                href={item.path}
                key={item.id}
                className={clsx(
                  `
  flex flex-col
  items-center
  gap-1
  px-3
  py-2
  rounded-full
  transition-all
  duration-300
  `,
                  isActive
                    ? `
      bg-primary
      text-primary-foreground
      scale-110
      shadow-lg
    `
                    : `
      text-white/70
      hover:text-white
      hover:scale-105
    `,
                )}
              >
                <Icon size={20} />
                <span className="text-[10px] uppercase tracking-wider">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
