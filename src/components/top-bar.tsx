"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useCrt } from "@/components/crt-provider"
import { fmt } from "@/content"
import { LOCALE_COOKIE, localePath, locales, stripLocale, type Locale } from "@/i18n/config"
import { useI18n } from "@/i18n/provider"
import { getRooms } from "@/lib/rooms"
import { cn } from "@/lib/utils"

// each language named in itself, so a visitor can find their own
const LANGUAGE_NAMES: Record<Locale, string> = { en: "English", mn: "Монгол" }

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function TopBar() {
  const router = useRouter()
  const { site, projects, experience, ui, locale, href } = useI18n()
  const rooms = React.useMemo(() => getRooms(ui), [ui])
  const pathname = stripLocale(usePathname())
  const { crt, setCrt } = useCrt()
  const [open, setOpen] = React.useState("")
  const openRef = React.useRef(open)
  openRef.current = open
  const [clock, setClock] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)
  const [escFlash, setEscFlash] = React.useState(false)

  React.useEffect(() => {
    const tick = () => {
      const d = new Date()
      const two = (n: number) => String(n).padStart(2, "0")
      setClock(`${ui.bar.weekdays[d.getDay()]} ${two(d.getDate())} · ${two(d.getHours())}:${two(d.getMinutes())}`)
    }
    tick()
    const id = setInterval(tick, 30_000)
    const onFs = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onFs)
    return () => {
      clearInterval(id)
      document.removeEventListener("fullscreenchange", onFs)
    }
  }, [ui.bar.weekdays])

  // 1–4 open the rooms; Esc closes a project (back to the list) or returns to the desktop.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest("input, textarea, select, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return
      const room = rooms.find((r) => r.key === e.key)
      if (room) router.push(href(room.href))
      if (e.key === "Escape" && !openRef.current && pathname !== "/") {
        setEscFlash(true)
        setTimeout(() => setEscFlash(false), 140)
        router.push(href(pathname.startsWith("/projects/") ? "/projects" : "/"))
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [router, pathname, rooms, href])

  // Menu items blink four times (45ms each) before their action runs.
  const run = (action: () => void) => (e: Event) => {
    e.preventDefault()
    const item = e.target as HTMLElement
    if (reduceMotion()) {
      setOpen("")
      return action()
    }
    let n = 0
    const blink = () => {
      item.dataset.blink = n % 2 === 0 ? "on" : "off"
      if (++n < 4) return void setTimeout(blink, 45)
      delete item.dataset.blink
      setOpen("")
      action()
    }
    blink()
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 900)
    } catch {}
  }

  const surprise = () => {
    const pool = projects.filter((p) => pathname !== `/projects/${p.slug}`)
    router.push(href(`/projects/${pool[Math.floor(Math.random() * pool.length)].slug}`))
  }

  // remember the choice for un-prefixed links, then open the same page in the other language
  const switchTo = (l: Locale) => {
    if (l === locale) return
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`
    router.push(localePath(l, pathname) + window.location.hash)
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else document.documentElement.requestFullscreen().catch(() => {})
  }

  // breadcrumb row for everything except the bare desktop
  const room = rooms.find((r) => pathname === r.href || pathname.startsWith(r.href + "/"))
  const project = pathname.startsWith("/projects/") ? projects.find((p) => pathname === `/projects/${p.slug}`) : undefined
  const hint = project ? ui.bar.escProject : room?.href === "/contact" ? ui.bar.escWindow : ui.bar.escDesktop
  const branches = new Set(experience.map((e) => e.branch)).size

  return (
    <header className="fixed inset-x-0 top-0 z-[200] border-b border-encre bg-papier">
      <div className="flex min-h-12 items-stretch">
        <Link
          href={href()}
          aria-label={ui.bar.backToDesktop}
          className="flex items-center border-r border-encre px-5 font-display text-[24px] text-creme transition-colors duration-[80ms] ease-[steps(2,end)] hover:bg-encre hover:text-papier focus-visible:outline-1 focus-visible:outline-offset-[-5px] focus-visible:outline-papier max-[480px]:px-2.5 max-[480px]:text-[21px]"
        >
          {site.initials}
        </Link>

        <Menubar
          value={open}
          onValueChange={setOpen}
          className="mr-auto min-w-0 max-[720px]:flex-1 max-[720px]:overflow-x-auto"
        >
          <MenubarMenu value="file">
            <MenubarTrigger>{ui.menu.file}</MenubarTrigger>
            <MenubarContent>
              {rooms.map((r, i) => (
                <MenubarItem key={r.href} onSelect={run(() => router.push(href(r.href)))}>
                  <span className="flex gap-0 items-baseline">
                    <span className="min-w-9 text-[11px] tracking-[0.04em] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      {r.file} — {r.note}
                    </span>
                  </span>
                  <MenubarShortcut>{r.key}</MenubarShortcut>
                </MenubarItem>
              ))}
              <MenubarSeparator />
              <MenubarItem onSelect={run(() => window.print())}>
                {ui.menu.print} <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu value="extras">
            <MenubarTrigger>{ui.menu.extras}</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>{ui.menu.quickActions}</MenubarLabel>
              <MenubarItem onSelect={run(surprise)}>
                {ui.menu.surprise} <span aria-hidden>↗</span>
              </MenubarItem>
              <MenubarItem onSelect={run(copyEmail)}>{copied ? ui.menu.copied : ui.menu.copyEmail}</MenubarItem>
              <MenubarItem onSelect={run(() => (window.location.href = `mailto:${site.email}`))}>{ui.menu.sendEmail}</MenubarItem>
              <MenubarSeparator />
              {site.socials.map((s) => (
                <MenubarItem key={s.href} onSelect={run(() => window.open(s.href, "_blank", "noopener"))}>
                  {s.label} <span aria-hidden>↗</span>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu value="system">
            <MenubarTrigger>{ui.menu.system}</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onSelect={run(toggleFullscreen)}>{fullscreen ? ui.menu.exitFullscreen : ui.menu.fullscreen}</MenubarItem>
              <MenubarItem onSelect={run(() => setCrt(!crt))}>{crt ? ui.menu.crtOff : ui.menu.crtOn}</MenubarItem>
              <MenubarSeparator />
              <MenubarLabel>{ui.menu.language}</MenubarLabel>
              {locales.map((l) => (
                <MenubarItem key={l} lang={l} onSelect={run(() => switchTo(l))}>
                  {LANGUAGE_NAMES[l]}
                  {l === locale && <MenubarShortcut>✓</MenubarShortcut>}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className="flex border-l border-encre max-[720px]:hidden">
          <div role="group" aria-label={ui.menu.language} className="flex items-stretch border-r border-encre text-[12px] tracking-[0.1em]">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                lang={l}
                aria-pressed={l === locale}
                aria-label={LANGUAGE_NAMES[l]}
                onClick={() => switchTo(l)}
                className={cn(
                  "px-2.5 uppercase transition-colors duration-[80ms] ease-[steps(2,end)] hover:text-creme",
                  l === locale && "bg-encre text-papier hover:text-papier",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            href={href("/contact")}
            className="flex min-w-[100px] items-center justify-center gap-1.5 px-3.5 py-1.5 text-[14px] transition-colors duration-[80ms] hover:text-creme"
          >
            <span aria-hidden className="led relative top-px size-2 shrink-0 rounded-full bg-encre" />
            {site.status}
          </Link>
          <span className="flex min-w-[100px] items-center justify-center border-l border-encre px-3.5 py-1.5 text-[14px] tabular-nums">
            {clock}
          </span>
        </div>
      </div>

      {pathname !== "/" && (
        <nav aria-label={ui.bar.breadcrumb} className="flex border-t border-encre text-[12px] leading-none max-[720px]:text-[11px]">
          <span className="flex items-center gap-2 border-r border-grid px-3.5 pt-[calc(5px-.125em)] pb-[calc(5px+.125em)] max-[720px]:px-2.5">
            <Link href={href()} className="hover:text-creme">
              ~/desktop
            </Link>
            {room && (
              <>
                <span aria-hidden className="opacity-55">/</span>
                {project ? (
                  <Link href={href(room.href)} className="hover:text-creme">
                    {room.file}
                  </Link>
                ) : (
                  <span className="text-creme" aria-current="page">
                    {room.file}
                  </span>
                )}
              </>
            )}
            {project && (
              <>
                <span aria-hidden className="opacity-55">/</span>
                <span className="text-creme" aria-current="page">
                  {project.title}
                </span>
              </>
            )}
          </span>
          {room?.href === "/experience" && (
            <span className="flex items-center border-r border-grid px-3.5 max-[720px]:px-2.5">
              {fmt(ui.bar.entries, { entries: experience.length, branches })}
            </span>
          )}
          <span
            className={cn(
              "ml-auto flex items-center border-l border-grid px-3.5 tracking-[0.08em] max-[720px]:hidden",
              escFlash && "bg-encre text-papier",
            )}
          >
            {hint}
          </span>
        </nav>
      )}
    </header>
  )
}
