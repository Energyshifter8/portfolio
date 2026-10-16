import Link from "next/link"

import { cn } from "@/lib/utils"

/** Retro "app window" wrapper used by every inner page. */
export function WindowFrame({
  index,
  file,
  title,
  children,
  className,
}: {
  index: string
  file: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-20 pb-16 sm:px-8">
      <div className="border bg-card/60 shadow-[0_0_40px_rgb(233_165_75/0.06)]">
        <div className="flex items-center justify-between border-b bg-secondary/60 px-3 py-1.5 text-lg">
          <div className="flex items-center gap-3">
            <span className="text-signal">{index}</span>
            <span className="text-muted-foreground">{file}</span>
          </div>
          <Link
            href="/"
            aria-label="Close and go home"
            className="grid size-6 place-items-center border text-muted-foreground hover:bg-primary hover:text-primary-foreground"
          >
            ×
          </Link>
        </div>
        <div className={cn("p-5 sm:p-8", className)}>
          <h1 className="mb-8 text-5xl text-foreground glow sm:text-6xl">{title}</h1>
          {children}
        </div>
      </div>
    </main>
  )
}
