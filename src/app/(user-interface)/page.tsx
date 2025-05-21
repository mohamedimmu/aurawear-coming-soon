// import DropSection from "@/components/DropSection";
// import ContactForm from "@/components/ContactForm";
// import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import { Suspense } from "react";
import ComingSoonSection from "@/components/ComingSoonSection";
import BenefitsSection from "@/components/BenefitsSection";
import Newsletter from "@/components/Newsletter";
import PremiumActiveWear from "@/components/PremiumActiveWear";

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function RootLayout() {
  return (
    <div className="space-y-8 md:space-y-12">
      <HeroCarousel />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductCarousel title="Featured Product" slug="featured-products" />
      </Suspense>
      <ComingSoonSection />
      <PremiumActiveWear />
      <BenefitsSection />
      <Newsletter />
      {/* <HeroSection />
      <ContactForm />
      <DropSection /> */}
    </div>
  );
}
