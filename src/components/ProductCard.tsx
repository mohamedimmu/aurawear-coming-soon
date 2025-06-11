import React from "react";
import WixImage from "./WixImage";
import { products } from "@wix/stores";
import RichContentViewer from "./RichContentViewer";
import Link from "next/link";

interface ProductCardProps {
  product: products.Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const mainImage = product.media?.mainMedia?.image;
  const priceData = product?.priceData;
  const hasDiscount =
    priceData && priceData.discountedPrice !== priceData.price;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="flex cursor-pointer flex-col"
    >
      <div className="bg-muted mb-4 flex aspect-square max-w-96 items-center justify-center">
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={700}
          height={700}
          className="overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className="space-y-1 text-left">
        <h3 className="text-base font-medium">{product.name}</h3>
        <RichContentViewer
          content={product.description}
          className="text-muted-foreground"
          paragraphClassName="text-sm"
        />

        {hasDiscount ? (
          <div className="flex flex-row flex-wrap gap-4">
            <p className="text-base font-medium">
              {priceData.formatted?.discountedPrice}
            </p>
            <p className="text-muted-foreground text-base font-normal line-through">
              MRP: {priceData?.formatted?.price}
            </p>
          </div>
        ) : (
          <p className="text-base font-medium">
            MRP : {product.priceData?.formatted?.price}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
