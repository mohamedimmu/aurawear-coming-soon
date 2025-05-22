import { getProductBySlug } from "@/app/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client-server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import ProductDetails from "./ProductDetails";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
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

async function page({ params: { slug } }: PageProps) {
  const wixClient = await getWixServerClient();
  const product = await getProductBySlug(wixClient, slug);
  if (!product?._id) notFound();
  return (
    <div className="lg:container mx-auto px-4 lg:px-6 py-4">
      <ProductDetails product={product} />
    </div>
  );
}

export default page;
