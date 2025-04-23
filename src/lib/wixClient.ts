import { OAuthStrategy, createClient } from "@wix/sdk";
import Cookies from "js-cookie";
import { analyticsSession } from "@wix/analytics-session";

export const wixClient = createClient({
  modules: {
    analyticsSession,
  },
  auth: OAuthStrategy({
    clientId: process.env.CLIENT_ID!,
    tokens: JSON.parse(Cookies.get("session") || "{}"),
  }),
});
