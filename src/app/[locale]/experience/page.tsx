import type { Metadata } from "next"

import { CareerTrack } from "@/components/career-track"
import { pageContent, type LocaleParams } from "@/i18n/server"

type Props = { params: LocaleParams }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: (await pageContent(params)).ui.rooms.experience.label }
}

export default async function ExperiencePage({ params }: Props) {
  const { experience, site, ui } = await pageContent(params)
  return (
    <main className="fixed inset-x-0 top-[72px] bottom-0 overflow-hidden">
      <h1 className="sr-only">{ui.rooms.experience.label}</h1>
      <CareerTrack entries={[...experience].reverse()} user={site.shellUser} label={ui.experience.tracklabel} />
    </main>
  )
}
