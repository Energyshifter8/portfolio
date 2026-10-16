"use client"

import * as React from "react"

type Ctx = { crt: boolean; setCrt: (v: boolean) => void }
const CrtContext = React.createContext<Ctx>({ crt: true, setCrt: () => {} })

// The CRT switch lives on <html data-crt>, set before paint by the boot script in layout.tsx.
export function CrtProvider({ children }: { children: React.ReactNode }) {
  const [crt, setCrtState] = React.useState(true)

  React.useEffect(() => {
    setCrtState(document.documentElement.dataset.crt !== "off")
  }, [])

  const setCrt = React.useCallback((v: boolean) => {
    setCrtState(v)
    if (v) delete document.documentElement.dataset.crt
    else document.documentElement.dataset.crt = "off"
    try {
      localStorage.setItem("crt", v ? "on" : "off")
    } catch {}
  }, [])

  return (
    <CrtContext.Provider value={{ crt, setCrt }}>
      {children}
      <div aria-hidden className="crt-screen">
        <div className="crt-sweep" />
        <div className="crt-grain" />
      </div>
    </CrtContext.Provider>
  )
}

export const useCrt = () => React.useContext(CrtContext)
