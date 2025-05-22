import { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client-base";

const getTokensFromCookie = (cookieName: string): Tokens | undefined => {
  try {
    const cookieValue = Cookies.get(cookieName);
    return cookieValue ? JSON.parse(cookieValue) : undefined;
  } catch (error) {
    console.error("Failed to parse Wix session cookie:", error);
    return undefined;
  }
};

export const wixBrowserClient = () => {
  const tokens = getTokensFromCookie(WIX_SESSION_COOKIE);
  return getWixClient(tokens);
};
