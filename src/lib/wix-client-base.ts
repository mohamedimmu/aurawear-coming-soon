import { env } from "@/env";
import {
  backInStockNotifications,
  checkout,
  currentCart,
  orders,
  recommendations,
} from "@wix/ecom";
import { files } from "@wix/media";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { reviews } from "@wix/reviews";
import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { contacts } from "@wix/crm";
import { items } from "@wix/data";
import { emailSubscriptions } from "@wix/email-subscriptions";

export function getWixClient(tokens: Tokens | undefined) {
  return createClient({
    modules: {
      products,
      collections,
      currentCart,
      checkout,
      redirects,
      orders,
      recommendations,
      backInStockNotifications,
      reviews,
      members,
      files,
      contacts,
      items,
      emailSubscriptions,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_CLIENT_ID,
      tokens,
    }),
  });
}

export type WixClient = ReturnType<typeof getWixClient>;
