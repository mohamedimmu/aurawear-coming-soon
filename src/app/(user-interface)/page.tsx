import DropSection from "@/components/DropSection";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";

export default function RootLayout() {
  return (
    <div className="space-y-8 md:space-y-12">
      <HeroSection />
      <ContactForm />
      <DropSection />
    </div>
  );
}
