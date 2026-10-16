"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <Button
      variant="outline"
      className="font-pixel text-xl"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch {}
      }}
    >
      {copied ? "Copied ✓" : "Copy address"}
    </Button>
  )
}
