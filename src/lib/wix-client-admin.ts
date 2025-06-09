import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { files } from "@wix/media";
import { cache } from "react";
import { env } from "@/env";
import { contacts } from "@wix/crm";
import { items } from "@wix/data";
import { emailSubscriptions } from "@wix/email-subscriptions";

export const getWixAdminClient = cache(() => {
  const wixClient = createClient({
    modules: {
      files,
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

  return wixClient;
});
