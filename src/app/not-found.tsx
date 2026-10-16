import Link from "next/link"

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-5 pt-[72px] text-center">
      <div>
        <p className="font-display text-[clamp(96px,16vw,220px)] leading-[.9] text-creme">404</p>
        <p className="mt-4 text-[15px]">File not found.</p>
        <Link href="/" className="os-btn mt-8">
          ← Back to desktop
        </Link>
      </div>
    </main>
  )
}
