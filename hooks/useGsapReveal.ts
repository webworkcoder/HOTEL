"use client";

import { useEffect, useRef } from "react";
import { animations } from "@/lib/gsap";

type AnimationType =
  | "fadeUp"
  | "fadeLeft"
  | "fadeRight"
  | "scale"
  | "rotateReveal"
  | "blurReveal"
  | "imageZoom"
  | "luxuryText";

export const useGsapReveal = (type: AnimationType = "fadeUp") => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    animations[type](ref.current);
  }, [type]);

  return ref;
};
