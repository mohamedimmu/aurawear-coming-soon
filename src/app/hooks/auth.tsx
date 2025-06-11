import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constants";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  generateOAuthData,
  getLoginUrl,
  getLogoutUrl,
} from "@/app/wix-api/auth";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import ToastNotification from "@/components/ToastNotification";

const wixClient = wixBrowserClient();
export default function useAuth() {
  const pathname = usePathname();

  async function login(baseURL: string) {
    try {
      const oAuthData = await generateOAuthData(wixClient, pathname, baseURL);

      Cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData), {
        secure: process.env.VERCEL_ENV === "production",
        expires: new Date(Date.now() + 60 * 10 * 1000),
      });

      const redirectUrl = await getLoginUrl(wixClient, oAuthData);

      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.custom((t) => (
        <ToastNotification
          modalClose={t}
          variant="warning"
          title="Failed to log in. Please try again."
        />
      ));
    }
  }

  async function logout(baseURL: string) {
    try {
      const logoutUrl = await getLogoutUrl(wixClient, baseURL);

      Cookies.remove(WIX_SESSION_COOKIE);

      window.location.href = logoutUrl;
    } catch (error) {
      console.error(error);
      toast.custom((t) => (
        <ToastNotification
          modalClose={t}
          variant="warning"
          title="Failed to log out. Please try again."
        />
      ));
    }
  }

  return { login, logout };
}
