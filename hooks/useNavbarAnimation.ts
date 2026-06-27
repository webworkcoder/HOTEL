"use client";

import { useEffect, useRef } from "react";
import { navbarReveal } from "@/lib/gsap";

export const useNavbarAnimation = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    navbarReveal(ref.current);
  }, []);

  return ref;
};
