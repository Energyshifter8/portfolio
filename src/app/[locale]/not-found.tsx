"use client"

import Link from "next/link"

import { useI18n } from "@/i18n/provider"

export default function NotFound() {
  const { ui, href } = useI18n()
  return (
    <main className="grid min-h-dvh place-items-center px-5 pt-[72px] text-center">
      <div>
        <p className="font-display text-[clamp(96px,16vw,220px)] leading-[.9] text-creme">404</p>
        <p className="mt-4 text-[15px]">{ui.notFound.text}</p>
        <Link href={href()} className="os-btn mt-8">
          {ui.notFound.back}
        </Link>
      </div>
    </main>
  )
}
