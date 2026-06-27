"use client";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import React from "react";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: React.ReactNode;
}

export const SectionHeading = ({
  tag,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) => {
  const tagRef = useGsapReveal("fadeUp");
  const titleRef = useGsapReveal("luxuryText");
  const descRef = useGsapReveal("blurReveal");
  return (
    <div
      className={`flex flex-col gap-4 mb-14 ${className} ${
        align === "center"
          ? "items-center text-center"
          : "items-start text-left"
      }`}
    >
      {tag && (
        <div className="inline-flex items-center gap-3" ref={tagRef}>
          <span className="h-px w-10 bg-primary"></span>

          <span className="uppercase tracking-[0.35em] text-primary text-xs font-semibold">
            {tag}
          </span>

          <span className="h-px w-10 bg-primary"></span>
        </div>
      )}

      <h2
        className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl"
        ref={titleRef}
      >
        {title}
      </h2>

      {description && (
        <p
          className="max-w-2xl text-muted-foreground leading-8 text-sm sm:text-base"
          ref={descRef}
        >
          {description}
        </p>
      )}
    </div>
  );
};
