import DropSection from "@/components/DropSection";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";
// import { envServer } from "@/env/server";
// import { envClient } from "@/env/client";

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function RootLayout() {
  return (
    <div className="space-y-8 md:space-y-12">
      <HeroSection />
      <ContactForm />
      <DropSection />
    </div>
  );
}
