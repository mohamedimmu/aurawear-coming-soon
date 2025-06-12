import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import { Suspense } from "react";
import ComingSoonSection from "@/components/ComingSoonSection";
import PremiumActiveWear from "@/components/PremiumActiveWear";
import BenefitsSection from "@/components/BenefitsSection";
import Newsletter from "@/components/Newsletter";
import ProductCarouselSkeleton from "@/components/loading/ProductCarouselSkeleton";

export default async function RootLayout() {
  return (
    <div className="space-y-8 md:space-y-12">
      <HeroCarousel />
      <Suspense fallback={<ProductCarouselSkeleton />}>
        <ProductCarousel title="Featured Product" slug="featured-products" />
      </Suspense>
      <ComingSoonSection />
      <PremiumActiveWear />
      <BenefitsSection />
      <Newsletter />
    </div>
  );
}
