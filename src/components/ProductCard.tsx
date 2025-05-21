import React from "react";
import WixImage from "./WixImage";
import { products } from "@wix/stores";
import RichContentViewer from "./RichContentViewer";

interface ProductCardProps {
  product: products.Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <div
      className="flex w-full cursor-pointer flex-col"
      // onClick={handleCardClick}
    >
      <div className="mb-4 aspect-square w-full bg-muted">
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
        <p className="text-base font-medium">
          MRP : {product.priceData?.formatted?.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
