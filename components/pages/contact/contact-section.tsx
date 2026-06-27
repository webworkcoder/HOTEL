import Image from "next/image";

export const ContactSection = () => {
  return (
    <section className="pb-20">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 overflow-hidden border border-border bg-card">
          {/* Left Side */}
          <div className="relative min-h-125">
            <Image
              src="/images/room6.png"
              alt="Hotel Blu Plaza"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-10 left-10 text-white max-w-md">
              <span className="uppercase tracking-[0.4em] text-primary text-sm">
                Hotel Blu Plaza
              </span>

              <h2 className="text-5xl font-heading mt-4 mb-5 text-muted">
                Experience luxury hospitality.
              </h2>

              <p className="text-white/80 leading-8">
                Whether you&#39;re planning a weekend escape or a business stay, our
                team is ready to assist you.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 lg:p-12">
            <span className="uppercase tracking-[0.3em] text-primary text-sm font-medium">
              Get In Touch
            </span>

            <h2 className="text-4xl font-heading mt-4 mb-8">
              Send us a message
            </h2>

            <form className="space-y-6">
              <input
                placeholder="Full Name"
                className="w-full h-14 px-5 border border-border bg-background outline-none"
              />

              <input
                placeholder="Email Address"
                className="w-full h-14 px-5 border border-border bg-background outline-none"
              />

              <input
                placeholder="Phone Number"
                className="w-full h-14 px-5 border border-border bg-background outline-none"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full p-5 border border-border bg-background outline-none resize-none"
              />

              <button
                className="
                  h-14
                  px-10
                  bg-primary
                  text-primary-foreground
                  uppercase
                  tracking-widest
                  cursor-pointer
                  hover:opacity-90
                  transition-all
                "
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
