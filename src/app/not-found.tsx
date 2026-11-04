import "@fontsource/dotgothic16/latin-400.css"
import "@fontsource/jacquard-12/latin-400.css"
import "./globals.css"

import Link from "next/link"

// Requests that never reach a language (the middleware sends almost everything to one).
export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <body>
        <main className="grid min-h-dvh place-items-center px-5 text-center">
          <div>
            <p className="font-display text-[clamp(96px,16vw,220px)] leading-[.9] text-creme">404</p>
            <p className="mt-4 text-[15px]">File not found.</p>
            <Link href="/" className="os-btn mt-8">
              ← Back to desktop
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
