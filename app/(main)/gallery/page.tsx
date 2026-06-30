import { GallerySection } from "@/components/pages/gallery/page";
import { PageBanner } from "@/components/shared/page-banner";

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        title="Moments of Luxury & Comfort"
        description="Step inside Hotel Blu Plaza and experience beautifully crafted spaces designed for unforgettable stays."
        image="/images/gallery.JPG"
      />

      <GallerySection />
    </>
  );
}
