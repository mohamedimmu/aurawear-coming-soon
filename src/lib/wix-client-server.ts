import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { contacts } from "@wix/crm";
import { items } from "@wix/data";
import { emailSubscriptions } from "@wix/email-subscriptions";
import { envServer } from "@/env/server";

export const wixClientServer = createClient({
  modules: {
    contacts,
    items,
    emailSubscriptions,
  },
  auth: ApiKeyStrategy({
    siteId: envServer.SITE_ID,
    apiKey: envServer.API_KEY,
    accountId: envServer.ACCOUNT_ID,
  }),
});
