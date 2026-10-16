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
import { experience, projects, site } from "@/content/site"
import { rooms } from "@/lib/rooms"
import { cn } from "@/lib/utils"

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function TopBar() {
  const router = useRouter()
  const pathname = usePathname()
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
      setClock(
        `${d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit" })} · ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`,
      )
    }
    tick()
    const id = setInterval(tick, 30_000)
    const onFs = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onFs)
    return () => {
      clearInterval(id)
      document.removeEventListener("fullscreenchange", onFs)
    }
  }, [])

  // 1–4 open the rooms; Esc closes a project (back to the list) or returns to the desktop.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest("input, textarea, select, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return
      const room = rooms.find((r) => r.key === e.key)
      if (room) router.push(room.href)
      if (e.key === "Escape" && !openRef.current && pathname !== "/") {
        setEscFlash(true)
        setTimeout(() => setEscFlash(false), 140)
        router.push(pathname.startsWith("/projects/") ? "/projects" : "/")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [router, pathname])

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
    router.push(`/projects/${pool[Math.floor(Math.random() * pool.length)].slug}`)
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else document.documentElement.requestFullscreen().catch(() => {})
  }

  // breadcrumb row for everything except the bare desktop
  const room = rooms.find((r) => pathname === r.href || pathname.startsWith(r.href + "/"))
  const project = pathname.startsWith("/projects/") ? projects.find((p) => pathname === `/projects/${p.slug}`) : undefined
  const hint = project ? "ESC — close project" : room?.href === "/contact" ? "ESC — close window" : "ESC — back to desktop"
  const branches = new Set(experience.map((e) => e.branch)).size

  return (
    <header className="fixed inset-x-0 top-0 z-[200] border-b border-encre bg-papier">
      <div className="flex min-h-12 items-stretch">
        <Link
          href="/"
          aria-label="Back to desktop"
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
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              {rooms.map((r, i) => (
                <MenubarItem key={r.href} onSelect={run(() => router.push(r.href))}>
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
                Print this page <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu value="extras">
            <MenubarTrigger>Extras</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Quick actions</MenubarLabel>
              <MenubarItem onSelect={run(surprise)}>
                Surprise me <span aria-hidden>↗</span>
              </MenubarItem>
              <MenubarItem onSelect={run(copyEmail)}>{copied ? "Copied ✓" : "Copy my email"}</MenubarItem>
              <MenubarItem onSelect={run(() => (window.location.href = `mailto:${site.email}`))}>Send an email</MenubarItem>
              <MenubarSeparator />
              {site.socials.map((s) => (
                <MenubarItem key={s.href} onSelect={run(() => window.open(s.href, "_blank", "noopener"))}>
                  {s.label} <span aria-hidden>↗</span>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu value="system">
            <MenubarTrigger>System</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onSelect={run(toggleFullscreen)}>{fullscreen ? "Exit full screen" : "Full screen"}</MenubarItem>
              <MenubarItem onSelect={run(() => setCrt(!crt))}>{crt ? "Turn off the CRT" : "Turn on the CRT"}</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className="flex border-l border-encre max-[720px]:hidden">
          <Link
            href="/contact"
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
        <nav aria-label="Breadcrumb" className="flex border-t border-encre text-[12px] leading-none max-[720px]:text-[11px]">
          <span className="flex items-center gap-2 border-r border-grid px-3.5 pt-[calc(5px-.125em)] pb-[calc(5px+.125em)] max-[720px]:px-2.5">
            <Link href="/" className="hover:text-creme">
              ~/desktop
            </Link>
            {room && (
              <>
                <span aria-hidden className="opacity-55">/</span>
                {project ? (
                  <Link href={room.href} className="hover:text-creme">
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
              {experience.length} entries · {branches} branches
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
