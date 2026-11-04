import { Desktop } from "@/components/desktop"
import { pageContent, type LocaleParams } from "@/i18n/server"

export default async function Home({ params }: { params: LocaleParams }) {
  return <Desktop content={await pageContent(params)} />
}
