import type { Metadata } from "next"
import "@fontsource/vt323"
import "@fontsource/space-mono/400.css"
import "@fontsource/space-mono/700.css"
import "@fontsource/unifrakturmaguntia"
import "./globals.css"

import { CrtProvider } from "@/components/crt-provider"
import { TopBar } from "@/components/top-bar"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
  description: site.tagline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <CrtProvider>
          <TopBar />
          {children}
        </CrtProvider>
      </body>
    </html>
  )
}
