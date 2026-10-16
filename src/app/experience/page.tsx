import type { Metadata } from "next"

import { CareerTrack } from "@/components/career-track"
import { experience, site } from "@/content/site"

export const metadata: Metadata = { title: "Experience" }

export default function ExperiencePage() {
  const user = `${site.name.split(" ")[0].toLowerCase()}@${site.location.split(",")[0].toLowerCase()}`
  return (
    <main className="fixed inset-x-0 top-[72px] bottom-0 overflow-hidden">
      <h1 className="sr-only">Experience</h1>
      <CareerTrack entries={[...experience].reverse()} user={user} />
    </main>
  )
}
