"use client"

import * as React from "react"

type Ctx = { crt: boolean; setCrt: (v: boolean) => void }
const CrtContext = React.createContext<Ctx>({ crt: true, setCrt: () => {} })

export function CrtProvider({ children }: { children: React.ReactNode }) {
  const [crt, setCrtState] = React.useState(true)

  React.useEffect(() => {
    try {
      if (localStorage.getItem("crt") === "off") setCrtState(false)
    } catch {}
  }, [])

  const setCrt = React.useCallback((v: boolean) => {
    setCrtState(v)
    try {
      localStorage.setItem("crt", v ? "on" : "off")
    } catch {}
  }, [])

  return (
    <CrtContext.Provider value={{ crt, setCrt }}>
      <div className={crt ? "crt min-h-dvh" : "min-h-dvh"}>{children}</div>
    </CrtContext.Provider>
  )
}

export const useCrt = () => React.useContext(CrtContext)
