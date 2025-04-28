import DropSection from "@/components/DropSection";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";
import { envServer } from "@/env/server";

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function RootLayout() {
  console.log(envServer.SITE_ID);
  return (
    <div className="space-y-8 md:space-y-12">
      <HeroSection />
      <ContactForm />
      <DropSection />
    </div>
  );
}
