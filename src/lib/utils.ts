import { products } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { orders } from "@wix/ecom";

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

// Utility function to determine badge color based on status
export const getStatusColor = (
  status: string,
  type: "payment" | "delivery",
): string => {
  if (type === "payment") {
    switch (status) {
      case orders.PaymentStatus.PAID:
        return "bg-green-500 dark:bg-green-600 text-white";
      case orders.PaymentStatus.NOT_PAID:
        return "bg-red-500 dark:bg-red-600 text-white";
      case orders.PaymentStatus.FULLY_REFUNDED:
        return "bg-purple-500 dark:bg-purple-600 text-white";
      case orders.PaymentStatus.PARTIALLY_PAID:
        return "bg-orange-500 dark:bg-orange-600 text-white";
      case orders.PaymentStatus.PARTIALLY_REFUNDED:
        return "bg-purple-400 dark:bg-purple-500";
      case orders.PaymentStatus.PENDING:
        return "bg-yellow-500 dark:bg-yellow-600 text-white dark:text-white";
      case orders.PaymentStatus.PENDING_MERCHANT:
        return "bg-amber-500 dark:bg-amber-600 text-white dark:text-white";
      case orders.PaymentStatus.CANCELED:
        return "bg-red-600 text-white dark:bg-red-700";
      case orders.PaymentStatus.DECLINED:
        return "bg-red-500 dark:bg-red-600 text-white";
      case orders.PaymentStatus.UNSPECIFIED:
        return "bg-gray-500 dark:bg-gray-600 text-white";
      default:
        return "bg-gray-500 dark:bg-gray-600 text-white";
    }
  }

  if (type === "delivery") {
    switch (status) {
      case orders.FulfillmentStatus.FULFILLED:
        return "bg-green-500 dark:bg-green-600 text-white";
      case orders.FulfillmentStatus.NOT_FULFILLED:
        return "bg-yellow-500 dark:bg-yellow-600 text-black dark:text-white";
      case orders.FulfillmentStatus.PARTIALLY_FULFILLED:
        return "bg-orange-500 dark:bg-orange-600 text-white";
      default:
        return "bg-gray-500 dark:bg-gray-600 text-white";
    }
  }

  return "bg-gray-500 dark:bg-gray-600 text-white";
};

export default getStatusColor;

export const paymentStatusMap: Record<orders.PaymentStatus, string> = {
  [orders.PaymentStatus.PAID]: "Paid",
  [orders.PaymentStatus.NOT_PAID]: "Not paid",
  [orders.PaymentStatus.FULLY_REFUNDED]: "Refunded",
  [orders.PaymentStatus.PARTIALLY_PAID]: "Partially paid",
  [orders.PaymentStatus.PARTIALLY_REFUNDED]: "Partially refunded",
  [orders.PaymentStatus.PENDING]: "Pending",
  [orders.PaymentStatus.UNSPECIFIED]: "No information",
  [orders.PaymentStatus.PENDING_MERCHANT]: "Pending Merchant",
  [orders.PaymentStatus.CANCELED]: "Canceled",
  [orders.PaymentStatus.DECLINED]: "Declined",
};

export const fulfillmentStatusMap: Record<orders.FulfillmentStatus, string> = {
  [orders.FulfillmentStatus.FULFILLED]: "Delivered",
  [orders.FulfillmentStatus.NOT_FULFILLED]: "Not fulfilled",
  [orders.FulfillmentStatus.PARTIALLY_FULFILLED]: "Partially delivered",
};

// Reusable function to get display string for payment or fulfillment status
export function getStatusDisplay(
  status: orders.PaymentStatus | orders.FulfillmentStatus | undefined,
  type: "payment" | "delivery",
): string | null {
  if (!status) {
    return null;
  }

  if (type === "payment") {
    return paymentStatusMap[status as orders.PaymentStatus] || null;
  }

  if (type === "delivery") {
    return fulfillmentStatusMap[status as orders.FulfillmentStatus] || null;
  }

  return null;
}