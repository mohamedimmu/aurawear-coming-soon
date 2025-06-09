import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  getCheckoutUrlForCurrentCart,
  getCheckoutUrlForProduct,
  GetCheckoutUrlForProductValues,
} from "@/app/wix-api/checkout";
import { useState } from "react";
import { toast } from "sonner";
import ToastNotification from "@/components/ToastNotification";

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
      toast.custom((t) => (
        <ToastNotification
          variant="warning"
          modalClose={t}
          title="Failed to load checkout. Please try again."
        />
      ));
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
      toast.custom((t) => (
        <ToastNotification
          variant="warning"
          modalClose={t}
          title="Failed to load checkout. Please try again."
        />
      ));
    }
  }

  return { startCheckoutFlow, pending };
}
