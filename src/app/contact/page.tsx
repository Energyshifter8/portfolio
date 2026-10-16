import type { Metadata } from "next"

import { CopyEmail } from "./copy-email"
import { WindowFrame } from "@/components/window-frame"
import { Button } from "@/components/ui/button"
import { site } from "@/content/site"

export const metadata: Metadata = { title: "Contact" }

export default function ContactPage() {
  return (
    <WindowFrame index="04" file="contact.app" title="Contact">
      <p className="max-w-xl text-xl">
        Open to freelance work, full-time roles and interesting side projects. The quickest way to reach me is email.
      </p>

      <div className="mt-8 border bg-background/40 p-4 text-xl">
        <p className="text-muted-foreground">
          $ mail <span className="text-foreground">{site.email}</span>
          <span className="blink">_</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild className="font-pixel text-xl">
            <a href={`mailto:${site.email}`}>Send email</a>
          </Button>
          <CopyEmail email={site.email} />
        </div>
      </div>

      <ul className="mt-8 divide-y border-y text-2xl">
        {site.socials.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noreferrer" className="flex justify-between py-3 hover:text-primary">
              {s.label} <span>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </WindowFrame>
  )
}
