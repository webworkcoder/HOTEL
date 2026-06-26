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
  return (
    <div
      className={`flex flex-col gap-4 mb-14 ${className} ${
        align === "center"
          ? "items-center text-center"
          : "items-start text-left"
      }`}
    >
      {tag && (
        <div className="inline-flex items-center gap-3">
          <span className="h-px w-10 bg-primary"></span>

          <span className="uppercase tracking-[0.35em] text-primary text-xs font-semibold">
            {tag}
          </span>

          <span className="h-px w-10 bg-primary"></span>
        </div>
      )}

      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl">
        {title}
      </h2>

      {description && (
        <p className="max-w-2xl text-muted-foreground leading-8 text-sm sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
};
