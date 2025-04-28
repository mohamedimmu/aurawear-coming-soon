import DropSection from "@/components/DropSection";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function RootLayout() {
  return (
    <div className="space-y-8 md:space-y-12">
      <p>{env.MEASUREMENT_ID}</p>
      <HeroSection />
      <ContactForm />
      <DropSection />
    </div>
  );
}
