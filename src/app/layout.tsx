// The real root layout is app/[locale]/layout.tsx (it sets <html lang>).
// This pass-through only exists so app/not-found.tsx has a parent.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
