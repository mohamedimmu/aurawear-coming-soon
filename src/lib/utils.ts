import { products } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface MediaUrls {
  imageUrl: string | undefined;
  thumbnailUrl: string | undefined;
  resolvedThumbnailUrl: string | undefined;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "USD",
) {
  return Intl.NumberFormat("en", { style: "currency", currency }).format(
    Number(price),
  );
}

export function findVariant(
  product: products.Product,
  selectedOptions: Record<string, string>,
) {
  if (!product.manageVariants) return null;

  return (
    product.variants?.find((variant) => {
      return Object.entries(selectedOptions).every(
        ([key, value]) => variant.choices?.[key] === value,
      );
    }) || null
  );
}

export function checkInStock(
  product: products.Product,
  selectedOptions: Record<string, string>,
) {
  const variant = findVariant(product, selectedOptions);

  return variant
    ? variant.stock?.quantity !== 0 && variant.stock?.inStock
    : product.stock?.inventoryStatus === products.InventoryStatus.IN_STOCK ||
        product.stock?.inventoryStatus ===
          products.InventoryStatus.PARTIALLY_OUT_OF_STOCK;
}

export function getMediaUrls(mediaItem: products.MediaItem): MediaUrls {
  const imageUrl = mediaItem.image?.url;
  
  //eg: https://static.wixstatic.com/media/11062b_e2fe3f2568f04c639727a838bce1d32cf002.jpg/v1/fit/w_50,h_50,q_90/file.jpg
  const thumbnailUrl = mediaItem.thumbnail?.url;
  //eg: 11062b_e2fe3f2568f04c639727a838bce1d32cf002.jpg
  const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;
  // video url
  const resolvedThumbnailUrl = resolveVideoThumbnail(
    stillFrameMediaId,
    thumbnailUrl,
  );

  return {
    imageUrl,
    thumbnailUrl,
    resolvedThumbnailUrl,
  };
}

export function resolveVideoThumbnail(
  stillFrameMediaId: string | undefined,
  thumbnailUrl: string | undefined,
): string | undefined {
  if (!stillFrameMediaId || !thumbnailUrl) return undefined;
  return thumbnailUrl.split(stillFrameMediaId)[0] + stillFrameMediaId;
}

export function formatINRCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}
