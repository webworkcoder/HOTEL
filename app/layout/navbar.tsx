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
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
          <Link href="/">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
              Hotel Blu <span className="text-accent">Plaza</span>
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
                    "relative text-sm uppercase tracking-wider transition-all duration-300",
                    isActive
                      ? "text-accent font-semibold"
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
            className="hidden lg:flex rounded-none px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            <CalendarRange size={18} />
            Reservation
          </Button>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white">
            <Menu size={30} />
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
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-white/70 hover:text-white",
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
