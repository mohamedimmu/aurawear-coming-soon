import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  getCheckoutUrlForCurrentCart,
  getCheckoutUrlForProduct,
  GetCheckoutUrlForProductValues,
} from "@/wix-api/checkout";
import { useState } from "react";
import { toast } from "sonner";

const wixClient = wixBrowserClient();

export function useCartCheckout() {
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixClient);
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.error(error);
      toast.warning("Failed to load checkout. Please try again.");
    }
  }

  return { startCheckoutFlow, pending };
}

export function useQuickBuy() {
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow(values: GetCheckoutUrlForProductValues) {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForProduct(wixClient, values);
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.error(error);
      toast.warning("Failed to load checkout. Please try again.");
    }
  }

  return { startCheckoutFlow, pending };
}
