"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarCheck,
  BedDouble,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { api } from "@/lib/endpoints";

export const DashboardNavbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Bookings",
      href: "/dashboard/bookings",
      icon: CalendarCheck,
    },
    {
      label: "Rooms",
      href: "/dashboard/rooms",
      icon: BedDouble,
    },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full transition-all duration-500",
        scrolled
          ? `
            bg-black/60
            backdrop-blur-xl
            shadow-lg
            text-muted
          `
          : `
            bg-transparent
          `,
      )}
    >
      {/* Glass container */}
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="
            group
            transition-all
            duration-500
  "
          >
            <h2 className="text-3xl font-bold font-heading text-primary">
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
                Plaza Admin
              </span>
            </h2>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300
                    ${
                      active
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-700 hover:bg-white/70"
                    } ${scrolled ? "text-muted" : ""}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Logout */}
            <button
              onClick={async () => {
                try {
                  await api.admin.logout();
                } catch (err) {
                  console.error("Logout API error:", err);
                }
                document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                router.push("/login");
              }}
              className={`${scrolled ? "text-muted" : "text-gray-700"} flex items-center gap-2 cursor-pointer hover:text-primary transition-colors`}
            >
              <LogOut className="h-4 w-4 " />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
