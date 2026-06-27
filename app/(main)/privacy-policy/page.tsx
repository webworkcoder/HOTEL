import { PrivacyPolicySection } from "@/components/pages/terms/privacy-policy-section";
import { PageBanner } from "@/components/shared/page-banner";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner
        title="Privacy Policy"
        description="Your privacy is important to us. Learn how we collect and protect your information."
        image="/images/gallery.JPG"
      />

      <PrivacyPolicySection />
    </>
  );
}
