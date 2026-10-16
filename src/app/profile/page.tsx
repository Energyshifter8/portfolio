import Link from "next/link"
import type { Metadata } from "next"

import { Capabilities } from "@/components/capabilities"
import { DitherPortrait } from "@/components/dither-portrait"
import { Reveal } from "@/components/reveal"
import { profile, site } from "@/content/site"

export const metadata: Metadata = { title: "Profile" }

const label = "text-[11px] tracking-[0.14em] text-braise uppercase"

export default function ProfilePage() {
  const [lead, background] = profile.about
  return (
    <main className="pt-[72px]">
      <div className="mx-auto w-[min(100%,1500px)] px-[clamp(28px,6vw,100px)] max-[720px]:px-5 max-[480px]:px-[18px]">
        {/* hero */}
        <section className="grid min-h-[calc(100dvh-72px)] grid-rows-[auto_1fr_auto] pt-6 max-[720px]:min-h-0 max-[720px]:pt-[26px] max-[720px]:pb-5">
          <Reveal as="p" mode="type" className="border-b border-encre pb-2.5 text-[11px] tracking-[0.11em] uppercase">
            03 / profile.sys
          </Reveal>
          <div className="flex items-center justify-between gap-10 py-10 max-[720px]:my-12 max-[720px]:py-0">
            <Reveal
              as="h1"
              mode="title"
              className="max-w-[16ch] font-display text-[clamp(54px,7.4vw,116px)] leading-[.88] text-creme max-[720px]:text-[clamp(46px,13vw,68px)] max-[720px]:leading-[.9] max-[480px]:text-[clamp(44px,13.5vw,60px)]"
            >
              {site.tagline}
            </Reveal>
            <DitherPortrait src="/portrait.png" resolution={120} bleed={0.2} className="hidden h-[clamp(220px,34vh,360px)] shrink-0 lg:block" />
          </div>
          <div className="grid grid-cols-12 gap-x-[clamp(16px,2.4vw,38px)] gap-y-8 border-t-[3px] border-encre pt-5 pb-10 max-[720px]:grid-cols-1">
            <div className="col-span-6 max-[720px]:col-span-1">
              <p className={label}>{profile.aboutLabels[0]}</p>
              <Reveal as="p" mode="lines" className="mt-3 text-[clamp(18px,1.65vw,25px)] leading-[1.46] max-[720px]:text-[18px] max-[720px]:leading-[1.5]">
                {lead}
              </Reveal>
            </div>
            <div className="col-span-5 col-start-8 max-[720px]:col-span-1 max-[720px]:col-start-1">
              <p className={label}>{profile.aboutLabels[1]}</p>
              <Reveal as="p" mode="lines" delay={120} className="mt-3 text-[clamp(13px,1.05vw,15px)] leading-[1.65] max-[720px]:text-[13px] max-[720px]:leading-[1.6]">
                {background}
              </Reveal>
              <p className="mt-4 text-[clamp(13px,1.05vw,15px)] leading-[1.65] opacity-80">
                {site.location} · {profile.languages.join(" · ")}
              </p>
            </div>
          </div>
        </section>

        {/* capabilities */}
        <section className="border-t-[3px] border-current pt-6">
          <h2 className="font-display text-[clamp(52px,6.6vw,104px)] leading-[.9] text-creme max-[720px]:text-[clamp(38px,12vw,56px)]">
            {profile.skillsTitle}
          </h2>
          <Capabilities groups={profile.skills} />
        </section>

        {/* call to action */}
        <section className="my-16 grid grid-cols-2 items-center gap-8 border-y-[3px] border-braise py-10 max-[720px]:grid-cols-1">
          <p className="max-w-[32ch] font-display text-[clamp(28px,3.2vw,48px)] leading-[.98] text-creme max-[720px]:text-[34px]">
            {profile.cta.text}
          </p>
          <div className="justify-self-end max-[720px]:justify-self-stretch">
            <Link href="/contact" className="os-btn primary px-[22px] py-3 max-[720px]:w-full max-[720px]:justify-center">
              {profile.cta.button}
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
