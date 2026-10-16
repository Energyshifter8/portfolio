import type { Metadata } from "next"

import { DitherPortrait } from "@/components/dither-portrait"
import { WindowFrame } from "@/components/window-frame"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { profile, site } from "@/content/site"

export const metadata: Metadata = { title: "Profile" }

export default function ProfilePage() {
  return (
    <WindowFrame index="03" file="profile.sys" title="Profile">
      <div className="grid gap-10 md:grid-cols-[1fr_14rem]">
        <div className="space-y-4 text-xl">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-muted-foreground">
            {site.location} · {profile.languages.join(" · ")}
          </p>
        </div>
        <div className="hidden justify-center md:flex">
          <DitherPortrait src="/portrait.png" resolution={120} className="h-64 w-auto" />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {profile.skills.map((s) => (
          <Card key={s.group} className="gap-3 rounded-none bg-background/40 py-4 shadow-none">
            <CardHeader className="px-4">
              <CardTitle className="text-sm font-normal tracking-[0.3em] text-signal uppercase">
                {s.group}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5 px-4">
              {s.items.map((it) => (
                <Badge key={it} variant="outline" className="font-pixel text-base">{it}</Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </WindowFrame>
  )
}
