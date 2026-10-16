import type { Metadata, Viewport } from "next"
import "@fontsource/dotgothic16/latin-400.css"
import "@fontsource/dotgothic16/cyrillic-400.css"
import "@fontsource/jacquard-12/latin-400.css"
import "@fontsource/jacquard-12/latin-ext-400.css"
import "./globals.css"

import { CrtProvider } from "@/components/crt-provider"
import { TopBar } from "@/components/top-bar"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
  description: site.tagline,
}

export const viewport: Viewport = { themeColor: "#14100a" }

// Runs before first paint: marks JS as available (text reveals hide until armed)
// and restores the CRT switch so the overlay never flashes on or off.
const boot = `(function(){var d=document.documentElement;d.classList.add("js");try{if(localStorage.getItem("crt")==="off")d.dataset.crt="off"}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <CrtProvider>
          <TopBar />
          {children}
        </CrtProvider>
      </body>
    </html>
  )
}
