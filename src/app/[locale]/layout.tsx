import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import "@fontsource/dotgothic16/latin-400.css"
import "@fontsource/jacquard-12/latin-400.css"
import "@fontsource/jacquard-12/latin-ext-400.css"
import "../globals.css"

import { CrtProvider } from "@/components/crt-provider"
import { TopBar } from "@/components/top-bar"
import { getContent } from "@/content"
import { isLocale, locales } from "@/i18n/config"
import { I18nProvider } from "@/i18n/provider"

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export const dynamicParams = false
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { site } = getContent(locale)
  return {
    title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
    description: site.tagline,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
  }
}

export const viewport: Viewport = { themeColor: "#14100a" }

// Runs before first paint: marks JS as available (text reveals hide until armed)
// and restores the CRT switch so the overlay never flashes on or off.
const boot = `(function(){var d=document.documentElement;d.classList.add("js");try{if(localStorage.getItem("crt")==="off")d.dataset.crt="off"}catch(e){}})()`

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <I18nProvider content={getContent(locale)}>
          <CrtProvider>
            <TopBar />
            {children}
          </CrtProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
