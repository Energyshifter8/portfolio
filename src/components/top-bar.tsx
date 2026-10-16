"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useCrt } from "@/components/crt-provider"
import { site } from "@/content/site"

const sections = [
  { href: "/projects", label: "Projects", key: "1" },
  { href: "/experience", label: "Experience", key: "2" },
  { href: "/profile", label: "Profile", key: "3" },
  { href: "/contact", label: "Contact", key: "4" },
]

export function TopBar() {
  const router = useRouter()
  const { crt, setCrt } = useCrt()
  const [copied, setCopied] = React.useState(false)
  const [time, setTime] = React.useState("")

  React.useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [])

  // Keyboard shortcuts: 1–4 open sections, 0 / Esc goes home.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest("input, textarea, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return
      const s = sections.find((s) => s.key === e.key)
      if (s) router.push(s.href)
      if (e.key === "0" || e.key === "Escape") router.push("/")
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [router])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-12 items-stretch border-b bg-background/80 backdrop-blur-sm">
      <Link
        href="/"
        aria-label="Home"
        className="flex w-16 items-center justify-center border-r font-gothic text-2xl text-foreground glow hover:text-primary"
      >
        {site.initials}
      </Link>
      <Menubar className="h-full rounded-none border-0 bg-transparent px-2 shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="font-pixel text-lg">File</MenubarTrigger>
          <MenubarContent className="font-pixel">
            <MenubarItem className="text-lg" onSelect={() => router.push("/")}>
              Home <MenubarShortcut>0</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            {sections.map((s) => (
              <MenubarItem key={s.href} className="text-lg" onSelect={() => router.push(s.href)}>
                {s.label} <MenubarShortcut>{s.key}</MenubarShortcut>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="font-pixel text-lg">Extras</MenubarTrigger>
          <MenubarContent className="font-pixel">
            <MenubarItem className="text-lg" onSelect={copyEmail}>
              {copied ? "Copied ✓" : "Copy email"}
            </MenubarItem>
            <MenubarItem className="text-lg" asChild>
              <a href={`mailto:${site.email}`}>Send email</a>
            </MenubarItem>
            <MenubarSeparator />
            {site.socials.map((s) => (
              <MenubarItem key={s.href} className="text-lg" asChild>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label} <MenubarShortcut>↗</MenubarShortcut>
                </a>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="font-pixel text-lg">System</MenubarTrigger>
          <MenubarContent className="font-pixel">
            <MenubarCheckboxItem className="text-lg" checked={crt} onCheckedChange={(v) => setCrt(!!v)}>
              CRT effect
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem className="text-lg" disabled>
              Built with Next.js + shadcn/ui
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="ml-auto hidden items-center gap-4 px-4 text-lg text-muted-foreground sm:flex">
        <span>{site.location}</span>
        <span className="tabular-nums text-foreground">{time}</span>
      </div>
    </header>
  )
}
