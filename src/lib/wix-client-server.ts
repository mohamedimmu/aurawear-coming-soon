import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { contacts } from "@wix/crm";
import { items } from "@wix/data";
import { emailSubscriptions } from "@wix/email-subscriptions";
import { env } from "@/env";



export const wixClientServer = createClient({
  modules: {
    contacts,
    items,
    emailSubscriptions,
  },
  auth: ApiKeyStrategy({
    siteId: env.SITE_ID!,
    apiKey: env.API_KEY!,
    accountId: env.ACCOUNT_ID!,
  }),
});
