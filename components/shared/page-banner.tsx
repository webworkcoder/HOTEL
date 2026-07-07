import Image from "next/image";

interface Props {
  title: string;
  description?: string;
  image: string;
}

export const PageBanner = ({ title, description, image }: Props) => {
  return (
    <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
      <Image src={image} alt={title} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/70" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <span
          className="
              inline-block
              mb-5
              px-4
              py-2
              border
              border-primary/40
              bg-primary/10
              backdrop-blur-xl
              text-primary
              uppercase
              tracking-[0.35em]
              text-xs
              absolute
              right-5
              bottom-0
            "
        >
          Hotel Blu Plaza
        </span>
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-2xl md:text-6xl lg:text-7xl font-heading text-white mb-6">
            {title}
          </h1>

          {description && (
            <p className="max-w-2xl mx-auto text-white/80 leading-8 text-sm md:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
