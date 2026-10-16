import type { Metadata } from "next"

import { MailForm } from "./mail-form"
import { Desktop } from "@/components/desktop"
import { OsWindow } from "@/components/os-window"
import { site } from "@/content/site"

export const metadata: Metadata = { title: "Contact" }

const glyph: Record<string, string> = { GitHub: "⌥", LinkedIn: "☍" }

function Links({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {site.socials.map((s) => (
        <li key={s.href}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="group/l flex items-center gap-3 border-b-2 border-grid px-3.5 py-[11px] text-[14px] leading-[1.35] transition-colors duration-[80ms] ease-[steps(2,end)] hover:bg-encre hover:text-papier"
          >
            <span aria-hidden className="grid size-8 shrink-0 place-items-center border-2 border-encre text-[15px] group-hover/l:border-papier">
              {glyph[s.label] ?? "↗"}
            </span>
            <span>
              {s.label}
              <span className="block text-[12px] opacity-80">{s.handle}</span>
            </span>
          </a>
        </li>
      ))}
      <li>
        <a
          href={`mailto:${site.email}`}
          className="group/l flex items-center gap-3 px-3.5 py-[11px] text-[14px] leading-[1.35] transition-colors duration-[80ms] ease-[steps(2,end)] hover:bg-encre hover:text-papier"
        >
          <span aria-hidden className="grid size-8 shrink-0 place-items-center border-2 border-encre text-[15px] group-hover/l:border-papier">
            @
          </span>
          <span>
            Email
            <span className="block text-[12px] opacity-80">{site.email}</span>
          </span>
        </a>
      </li>
    </ul>
  )
}

export default function ContactPage() {
  return (
    <>
      <Desktop inert />
      {/* scrim over the desktop; the windows sit on top */}
      <div aria-hidden className="fixed inset-x-0 top-[72px] bottom-0 z-[100] bg-papier/65" />
      <div role="dialog" aria-modal="true" aria-label="Contact" className="fixed inset-x-0 top-[72px] bottom-0 z-[110] overflow-y-auto">
        <div className="relative mx-auto w-[976px] max-w-[calc(100vw-40px)] pt-20 pb-10 max-[1015px]:w-[min(680px,calc(100vw-40px))] max-[720px]:pt-0">
          <OsWindow
            id="mail"
            title="contact.app — new message"
            className="w-[min(680px,100%)] max-[720px]:fixed max-[720px]:inset-x-2 max-[720px]:top-[73px] max-[720px]:bottom-2 max-[720px]:w-auto"
          >
            <MailForm />
            <Links className="hidden border-t-[3px] border-encre max-[1015px]:block" />
          </OsWindow>
          <OsWindow
            id="links"
            title="links.url"
            className="absolute top-[104px] right-0 w-[270px] max-[1015px]:hidden"
          >
            <Links />
          </OsWindow>
        </div>
      </div>
    </>
  )
}
