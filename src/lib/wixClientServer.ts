import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { contacts } from "@wix/crm";
import { items } from "@wix/data";
import { emailSubscriptions } from "@wix/email-subscriptions";



export const wixClientServer = createClient({
  modules: {
    contacts,
    items,
    emailSubscriptions,
  },
  auth: ApiKeyStrategy({
    siteId: process.env.SITE_ID!,
    apiKey: process.env.API_KEY!,
    accountId: process.env.ACCOUNT_ID!,
  }),
});
