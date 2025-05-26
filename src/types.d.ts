import { AddToCartValues } from "./app/wix-api/cart";

interface AddtoCartNotificationType extends AddToCartValues {
  mediaItem: products.MediaItem | undefined;
  priceData: products.PriceData | undefined;
}