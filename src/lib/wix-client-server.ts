import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { contacts } from "@wix/crm";
import { items } from "@wix/data";
import { emailSubscriptions } from "@wix/email-subscriptions";
import { env } from "@/env";
import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { cache } from "react";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client-base";

export const wixClientServer = createClient({
  modules: {
    contacts,
    items,
    emailSubscriptions,
  },
  auth: ApiKeyStrategy({
    siteId: env.SITE_ID,
    apiKey: env.API_KEY,
    accountId: env.ACCOUNT_ID,
  }),
});

const getTokensFromCookies = async (): Promise<Tokens | undefined> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(WIX_SESSION_COOKIE);
    return sessionCookie ? JSON.parse(sessionCookie.value) : undefined;
  } catch (error) {
    console.error("Failed to parse session cookie:", error);
    return undefined;
  }
};

export const getWixServerClient = cache(async () => {
  const tokens = await getTokensFromCookies();
  return getWixClient(tokens);
});
