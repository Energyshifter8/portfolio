"use client"

import * as React from "react"

import type { Content, Localized } from "@/content"
import { localePath } from "@/i18n/config"

const I18nContext = React.createContext<Localized | null>(null)

export function I18nProvider({ content, children }: { content: Content; children: React.ReactNode }) {
  const value = React.useMemo(() => ({ ...content, href: (path = "/") => localePath(content.locale, path) }), [content])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/** The page's content in its language, plus `href()` to build locale-prefixed links. */
export function useI18n() {
  const c = React.useContext(I18nContext)
  if (!c) throw new Error("useI18n must be used inside <I18nProvider>")
  return c
}
