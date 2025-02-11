import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/settings";

const protectedPages = ["/dashboard", "/admin"];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the page needs authentication
  const isProtectedPage = protectedPages.some((page) =>
    pathname.includes(page)
  );

  if (isProtectedPage) {
    const token = request.cookies.get("auth_token");
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
