"use client"

import * as React from "react"

import { contact, site } from "@/content/site"
import { cn } from "@/lib/utils"

const field = "flex items-stretch border-b-2 border-encre text-[14.5px] focus-within:shadow-[inset_3px_0_0_var(--encre)]"
const key =
  "w-[90px] shrink-0 border-r-2 border-encre px-3.5 py-[9px] text-[12.5px] tracking-[0.08em] uppercase group-focus-within/f:bg-encre group-focus-within/f:text-papier"
const input =
  "min-w-0 flex-1 bg-transparent px-3.5 py-[9px] text-[14.5px] text-encre caret-creme outline-none placeholder:text-encre/45"

/** A static site has no mail server, so "send" composes the message in the visitor's mail app. */
export function MailForm() {
  const [status, setStatus] = React.useState<{ kind: "ok" | "error"; text: string } | null>(null)
  const [shake, setShake] = React.useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const message = String(data.get("message") ?? "").trim()
    if (!message) {
      setStatus({ kind: "error", text: "Write a few words first." })
      setShake(true)
      setTimeout(() => setShake(false), 200)
      return
    }
    const extras = [
      data.get("project") && `Project: ${data.get("project")}`,
      data.get("timeline") && `Timeline: ${data.get("timeline")}`,
      data.get("from") && `Reply to: ${data.get("from")}`,
    ].filter(Boolean)
    const body = [message, extras.length ? "\n—\n" + extras.join("\n") : ""].join("")
    const subject = String(data.get("subject") ?? "").trim() || "Hello"
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus({ kind: "ok", text: "✓ Opening your mail app…" })
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={field}>
        <span className={cn(key, "pt-3")}>To</span>
        <div className="flex-1 px-3.5 py-[9px]">
          <a href={`mailto:${site.email}`} className="hover:text-creme">
            {site.email}
          </a>
          <p className="text-[11px] leading-[1.5] opacity-80">{contact.note}</p>
        </div>
      </div>
      <label className={cn(field, "group/f")}>
        <span className={key}>From</span>
        <input name="from" type="email" autoComplete="email" placeholder={contact.fromPlaceholder} className={input} />
      </label>
      <label className={cn(field, "group/f")}>
        <span className={key}>Subject</span>
        <input name="subject" type="text" placeholder={contact.subjectPlaceholder} className={input} />
      </label>
      <div className="grid grid-cols-2 border-b-2 border-encre max-[540px]:grid-cols-1">
        {(
          [
            ["Project", "project", "Type (optional)", contact.projectTypes],
            ["Timeline", "timeline", "Timing (optional)", contact.timelines],
          ] as const
        ).map(([k, name, hint, options], i) => (
          <label
            key={name}
            className={cn(
              "group/f flex items-stretch text-[14.5px] focus-within:shadow-[inset_3px_0_0_var(--encre)]",
              i === 0 && "border-r-2 border-encre max-[540px]:border-r-0 max-[540px]:border-b-2",
            )}
          >
            <span className={cn(key, "w-auto max-[540px]:w-[90px]")}>{k}</span>
            <select
              name={name}
              defaultValue=""
              className={cn(input, "appearance-none bg-papier pr-8 hover:bg-grid hover:text-creme")}
            >
              <option value="">{hint}</option>
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none -ml-7 self-center pr-3 text-[12px]">
              ▾
            </span>
          </label>
        ))}
      </div>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          placeholder={contact.messagePlaceholder}
          className="block min-h-[190px] w-full resize-y bg-transparent px-5 py-[18px] text-[15px] leading-[1.65] text-encre caret-creme outline-none placeholder:text-encre/45 focus-visible:shadow-[inset_3px_0_0_var(--encre)]"
        />
      </label>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "min-h-0 px-5 text-[12.5px] empty:hidden",
          status && "py-2",
          status?.kind === "ok" && "bg-encre text-papier",
          status?.kind === "error" && "shadow-[inset_4px_0_0_var(--braise)]",
          shake && "animate-[shake_.16s_steps(4,end)]",
        )}
      >
        {status?.text}
      </p>
      <div className="flex border-t-[3px] border-encre">
        <button
          type="submit"
          className="flex-1 bg-encre py-3 text-[14px] tracking-[0.08em] text-papier hover:shadow-[inset_0_0_0_3px_var(--papier)] focus-visible:outline-offset-[-6px] focus-visible:outline-papier"
        >
          ▸ SEND MESSAGE
        </button>
      </div>
    </form>
  )
}
