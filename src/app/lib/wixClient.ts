import { OAuthStrategy, createClient } from "@wix/sdk";
import { emailSubscriptions } from "@wix/email-subscriptions";
import Cookies from "js-cookie";

export const wixClient = createClient({
  modules: {
    emailSubscriptions,
  },
  auth: OAuthStrategy({
    clientId: process.env.CLIENT_ID!,
    tokens: JSON.parse(Cookies.get("session") || "{}"),
  }),
});
