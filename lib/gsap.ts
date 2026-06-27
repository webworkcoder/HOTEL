import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const animations = {
  fadeUp: (el: Element) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );
  },

  fadeLeft: (el: Element) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );
  },

  fadeRight: (el: Element) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );
  },

  scale: (el: Element) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );
  },

  rotateReveal: (el: Element) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        rotate: -8,
        y: 100,
      },
      {
        opacity: 1,
        rotate: 0,
        y: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );
  },
  blurReveal: (el: Element) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        filter: "blur(20px)",
        y: 40,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );
  },
  luxuryText: (el: Element) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 60,
        letterSpacing: "0.5em",
      },
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0em",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      },
    );
  },
  imageZoom: (el: Element) => {
    gsap.fromTo(
      el,
      {
        scale: 1.2,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );
  },
};

export const navbarReveal = (el: Element) => {
  gsap.fromTo(
    el,
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
    },
  );
};
