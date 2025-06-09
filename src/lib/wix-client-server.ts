import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client-base";
import { cache } from "react";

const getTokensFromCookies = async (): Promise<Tokens | undefined> => {
  const cookieStore = await cookies(); // Call cookies() directly
  try {
    const sessionCookie = cookieStore.get(WIX_SESSION_COOKIE);
    return sessionCookie ? JSON.parse(sessionCookie.value) : JSON.parse("{}");
  } catch (error) {
    console.error("Failed to parse Wix session cookie:", error);
    return undefined;
  }
};

// In the browser (client-side), these methods work because `wixBrowserClient` is initialized once per browser session.
// Since each browser session is unique, we can safely reuse the initialized client.
// However, on the server-side, we must call `getWixClient(tokens)` every time,
// because server functions are stateless and do not retain client instances between calls.
// => wrong method: export const wixServerClient = getWixClient(tokens);

// Correct method
export const getWixServerClient = cache(async () => {
  const tokens = await getTokensFromCookies();
  return getWixClient(tokens);
});
