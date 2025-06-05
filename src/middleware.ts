import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { WIX_SESSION_COOKIE } from "./lib/constants";

const wixClient = createClient({
  auth: OAuthStrategy({ clientId: env.NEXT_PUBLIC_CLIENT_ID }),
});

export async function middleware(request: NextRequest) {
  // To get the pathname in server component
  // const headers = new Headers(request.headers);
  // headers.set("x-current-path", request.nextUrl.pathname);

  const cookies = request.cookies;
  const sessionCookie = cookies.get(WIX_SESSION_COOKIE);

  let sessionTokens = sessionCookie
    ? (JSON.parse(sessionCookie.value) as Tokens)
    : await wixClient.auth.generateVisitorTokens();

  if (sessionTokens.accessToken.expiresAt < Math.floor(Date.now() / 1000)) {
    try {
      sessionTokens = await wixClient.auth.renewToken(
        sessionTokens.refreshToken,
      );
    } catch {
      sessionTokens = await wixClient.auth.generateVisitorTokens();
    }
  }

  // This cookies only availabe on the server side for the current request
  request.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens));

  const response = NextResponse.next({ request });

  // Modifies the response that goes back to the client
  response.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens), {
    maxAge: 60 * 60 * 24 * 14,
    secure: true,
    //Need to fix it
    // secure: process.env.NODE_ENV === "production",
  });

  // const websiteLauched = true;
  // if (
  //   !websiteLauched &&
  //   (request.nextUrl.pathname === "/" ||
  //     request.nextUrl.pathname === "/products" ||
  //     request.nextUrl.pathname === "/contact" ||
  //     request.nextUrl.pathname === "/shop" ||
  //     request.nextUrl.pathname === "/cart")
  // ) {
  //   return NextResponse.redirect(new URL("/coming-soon", request.url));
  // }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
