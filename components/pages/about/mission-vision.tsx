"use client";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export const MissionVision = () => {
  const missionRef = useGsapReveal("fadeLeft");
  const visionRef = useGsapReveal("fadeRight");

  return (
    <section className="py-10 md:py-20 bg-secondary/30 overflow-hidden">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div
            ref={missionRef as any}
            className="bg-card border border-border p-10 hover:border-primary/40 transition-colors duration-300"
          >
            <h2 className="text-4xl font-heading mb-6 text-primary">
              Our Mission
            </h2>

            <p className="text-muted-foreground leading-8">
              To deliver exceptional hospitality experiences by blending refined
              luxury, personalized service, and thoughtful attention to every
              detail that enhances guest comfort and satisfaction.
            </p>
          </div>

          <div
            ref={visionRef as any}
            className="bg-card border border-border p-10 hover:border-primary/40 transition-colors duration-300"
          >
            <h2 className="text-4xl font-heading mb-6 text-primary">
              Our Vision
            </h2>

            <p className="text-muted-foreground leading-8">
              To be recognized as a leading destination in luxury hospitality,
              setting benchmarks for excellence, elegance, and unforgettable
              guest experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
