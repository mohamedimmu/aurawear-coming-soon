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
    <div className="w-full py-8">
      <div className="mb-6 flex items-center justify-between px-6 md:px-8 lg:px-12">
        <h2 className="font-lora text-2xl font-bold">{title}</h2>
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" className="!p-0 hover:!bg-transparent">
            <Link
              href="/shop"
              className="hover:text-muted-foreground !text-base font-medium"
            >
              Shop
            </Link>
          </Button>
          <CarouselButtons carouselId={carouselId} />
        </div>
      </div>
      <section className="relative w-full overflow-hidden">
        <div className="pl-6 md:pl-8 lg:pl-12">
          <div className="relative">
            {/* -mr-[calc(100vw-100%)] */}
            <CarouselSlider id={carouselId}>
              {products.map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product._id}
                  className="min-w-[220px] snap-start sm:min-w-[320px] md:min-w-[390px]"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </CarouselSlider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCarousel;
