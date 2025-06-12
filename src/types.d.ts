import { AddToCartValues } from "./wix-api/cart";

interface AddtoCartNotificationType extends AddToCartValues {
  mediaItem: products.MediaItem | undefined;
  priceData: products.PriceData | undefined;
}
