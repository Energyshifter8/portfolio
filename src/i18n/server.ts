import { notFound } from "next/navigation"

import { getContent, type Localized } from "@/content"
import { isLocale, localePath } from "@/i18n/config"

export type LocaleParams = Promise<{ locale: string }>

/** Content for a page's locale, plus `href()` for locale-prefixed links. */
export async function pageContent(params: LocaleParams): Promise<Localized> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return { ...getContent(locale), href: (path = "/") => localePath(locale, path) }
}
