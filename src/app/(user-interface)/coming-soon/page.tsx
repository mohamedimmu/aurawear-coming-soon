import DropSection from "@/components/DropSection";
import ContactForm from "@/components/ContactFormPages";
import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function ComingSoon() {
  redirect("/");
  return (
    <div className="space-y-8 md:space-y-12">
      <HeroSection />
      <ContactForm />
      <DropSection />
    </div>
  );
}
