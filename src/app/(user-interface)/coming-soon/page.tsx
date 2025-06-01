import DropSection from "@/components/DropSection";
import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";
// import { redirect } from "next/navigation";
import DropWaitlistForm from "@/components/DropWaitlistForm";

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function ComingSoon() {
  return (
    <div className="space-y-8 md:space-y-12">
      <HeroSection />
      <DropWaitlistForm />
      <DropSection />
    </div>
  );
}
