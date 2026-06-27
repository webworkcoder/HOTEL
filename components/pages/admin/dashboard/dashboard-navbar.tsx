"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  BedDouble,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

export const DashboardNavbar = () => {
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
    <header className="w-full sticky top-0 z-50">
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
                    }`}
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
              onClick={() => {
                console.log("logout");
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
