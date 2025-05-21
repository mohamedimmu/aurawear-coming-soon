import { queryProducts } from "@/app/wix-api/products";
import CarouselSlider from "./CarouselSlider";
import ProductCard from "./ProductCard";
import { getCollectionBySlug } from "@/app/wix-api/collections";
import { Button } from "./ui/button";
import Link from "next/link";
import CarouselButtons from "./CarouselButton";

interface Props {
  title: string;
  slug: string;
}

const ProductCarousel = async ({ title, slug }: Props) => {
  const collection = await getCollectionBySlug(slug);

  if (!collection?._id) {
    return null;
  }

  const queryResult = await queryProducts({
    collectionIds: collection._id,
  });

  if (!queryResult.items.length) {
    return null;
  }

  const products = queryResult.items;
  const carouselId = `carousel-${slug}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-lora font-bold">{title}</h2>
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" className="!p-0 hover:!bg-transparent">
              <Link
                href="#"
                className="hover:text-muted-foreground !text-base font-medium"
              >
                Shop
              </Link>
            </Button>
            <CarouselButtons carouselId={carouselId} />
          </div>
        </div>
        <CarouselSlider id={carouselId}>
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[220px] snap-start sm:min-w-[320px] md:min-w-[350px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </CarouselSlider>
      </div>
    </div>
  );
};

export default ProductCarousel;
