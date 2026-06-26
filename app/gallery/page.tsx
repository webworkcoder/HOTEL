import { GallerySection } from "@/components/pages/gallery/page";
import { PageBanner } from "@/components/shared/page-banner";

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        title="Our Gallery"
        description="Discover the elegance, luxury interiors and unforgettable experiences of Hotel Blu Plaza."
        image="/images/gallery.JPG"
      />

      <GallerySection />
    </>
  );
}
