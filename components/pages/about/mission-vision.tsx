export const MissionVision = () => {
  return (
    <section className="py-10 md:py-20 bg-secondary/30">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border p-10">
            <h2 className="text-4xl font-heading mb-6 text-primary">
              Our Mission
            </h2>

            <p className="text-muted-foreground leading-8">
              To provide unforgettable hospitality experiences by combining
              luxury, comfort and exceptional service for every guest.
            </p>
          </div>

          <div className="bg-card border border-border p-10">
            <h2 className="text-4xl font-heading mb-6 text-primary">
              Our Vision
            </h2>

            <p className="text-muted-foreground leading-8">
              To become one of the most trusted luxury hospitality destinations
              known for excellence and memorable guest experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
