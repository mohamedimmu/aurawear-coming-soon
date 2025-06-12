import React from "react";

const CarouselButtonsSkeleton = () => (
  <div className="flex gap-2">
    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
  </div>
);

const ProductCardSkeleton = () => (
  <div className="min-w-[220px] animate-pulse snap-start sm:min-w-[320px] md:min-w-[390px]">
    <div className="mb-4 h-full w-full rounded-lg bg-gray-200"></div>
    <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
  </div>
);

const ProductCarouselSkeleton = () => (
  <div className="mx-auto w-full max-w-7xl px-4 py-8">
    <div className="mb-6 flex items-center justify-between">
      <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200"></div>
      <div className="xxs:flex hidden items-center gap-4">
        <div className="hidden h-10 w-20 animate-pulse rounded bg-gray-200 md:block"></div>
        <CarouselButtonsSkeleton />
      </div>
    </div>
    <section className="relative w-full overflow-hidden">
      <div
        className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </section>
  </div>
);

export default ProductCarouselSkeleton;
