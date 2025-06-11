// export const dynamic = "force-dynamic";

import { queryProducts } from "@/app/wix-api/products";
import CarouselSlider from "./CarouselSlider";
import ProductCard from "./ProductCard";
import { getCollectionBySlug } from "@/app/wix-api/collections";
import { Button } from "./ui/button";
import Link from "next/link";
import CarouselButtons from "./CarouselButton";
import { getWixServerClient } from "@/lib/wix-client-server";

interface Props {
  title: string;
  slug: string;
}

const ProductCarousel = async ({ title, slug }: Props) => {
  const wixClient = await getWixServerClient();
  const collection = await getCollectionBySlug(wixClient, slug);

  if (!collection?._id) {
    return null;
  }

  const queryResult = await queryProducts(wixClient, {
    collectionIds: collection._id,
  });

  if (!queryResult.items.length) {
    return null;
  }

  const products = queryResult.items;
  const carouselId = `carousel-${slug}`;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-inter xs:text-2xl text-xl font-semibold">
          {title}
        </h2>
        <div className="xxs:flex hidden items-center gap-4">
          <Button variant="ghost" className="hidden md:block">
            <Link href="/shop" className="font-medium">
              Shop
            </Link>
          </Button>
          <CarouselButtons carouselId={carouselId} />
        </div>
      </div>
      <section className="relative w-full overflow-hidden">
        <div>
          <div className="relative">
            {/* -mr-[calc(100vw-100%)] */}
            <CarouselSlider id={carouselId}>
              {products.map((product) => (
                <div
                  key={product._id}
                  className="min-w-[220px] snap-start sm:min-w-[320px] md:min-w-[390px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </CarouselSlider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCarousel;
