export const locales = ["en", "mn"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"
export const LOCALE_COOKIE = "NEXT_LOCALE"

export const isLocale = (v: string | undefined): v is Locale => !!v && (locales as readonly string[]).includes(v)

/** Prefix an app path ("/projects") with the locale ("/mn/projects"). */
export const localePath = (locale: Locale, path = "/") => `/${locale}${path === "/" ? "" : path}`

/** Drop the locale prefix: "/mn/projects/x" → "/projects/x". */
export const stripLocale = (pathname: string) => {
  const rest = pathname.replace(/^\/(en|mn)(?=\/|$)/, "")
  return rest === "" ? "/" : rest
}
