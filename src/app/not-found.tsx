import Link from "next/link"

export default function NotFound() {
  return (
    <main className="grid h-dvh place-items-center px-4 text-center">
      <div>
        <p className="font-gothic text-7xl text-signal">404</p>
        <p className="mt-4 text-2xl">File not found.</p>
        <Link href="/" className="mt-6 inline-block text-xl text-primary hover:underline">
          ← back to desktop
        </Link>
      </div>
    </main>
  )
}
