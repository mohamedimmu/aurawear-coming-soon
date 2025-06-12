import { getProductBySlug } from "@/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client-server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import ProductDetails from "./ProductDetails";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const wixClient = await getWixServerClient();
  const product = await getProductBySlug(wixClient, slug);

  if (!product) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: "Get this product on Aurawear",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const wixClient = await getWixServerClient();
  const product = await getProductBySlug(wixClient, slug);
  if (!product?._id) notFound();
  return (
    <div className="mx-auto px-4 py-4 lg:container lg:px-6">
      <ProductDetails product={product} />
    </div>
  );
}

export default ProductDetailPage;
