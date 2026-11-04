import { NextResponse, type NextRequest } from "next/server"

import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from "@/i18n/config"

/** First supported language in Accept-Language, by q-value ("mn-MN,mn;q=0.9,en;q=0.8" → "mn"). */
function fromHeader(header: string | null): Locale | undefined {
  if (!header) return
  return header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=")
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
    .map((x) => x.lang)
    .find((l): l is Locale => isLocale(l))
}

// Paths without a language ("/", "/projects") are sent to one: the visitor's last choice,
// then their browser language, then English.
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return

  const saved = req.cookies.get(LOCALE_COOKIE)?.value
  const locale = isLocale(saved) ? saved : (fromHeader(req.headers.get("accept-language")) ?? defaultLocale)
  const url = req.nextUrl.clone()
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  url.search = search
  return NextResponse.redirect(url)
}

export const config = {
  // skip Next internals and anything with a file extension (images, fonts, favicon)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
