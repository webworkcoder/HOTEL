import { TermsConditionSection } from "@/components/pages/terms/terms-condition-section";
import { PageBanner } from "@/components/shared/page-banner";

export default function TermsPage() {
  return (
    <>
      <PageBanner
        title="Terms & Conditions"
        description="Please read our terms and conditions carefully before using our services."
        image="/images/gallery.JPG"
      />

      <TermsConditionSection />
    </>
  );
}
