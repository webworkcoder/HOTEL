"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export const FloatingWhatsapp = () => {
  const phoneNumber = "+919999984981";
  const message = encodeURIComponent(
    "Hello, I would like to know more about room availability.",
  );

  return (
    <div className="fixed bottom-21 right-4 z-[9999]">
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 blur-xl animate-pulse" />

      <Link
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        aria-label="Chat on WhatsApp"
        className="
          relative flex items-center justify-center
          w-16 h-16
          rounded-full
          bg-[#25D366]
          text-white
          shadow-[0_8px_30px_rgba(37,211,102,0.5)]
          transition-all duration-300
          hover:scale-110
          hover:shadow-[0_12px_40px_rgba(37,211,102,0.7)]
        "
      >
        <FaWhatsapp className="text-4xl" />
      </Link>
    </div>
  );
};
