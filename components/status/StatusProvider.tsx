'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// Progressiv forbedring. Siden rendres ferdig uten JavaScript med knappen synlig
// og "30 plasser per treff". Denne provideren oppdaterer KUN hvis /api/status
// svarer. Feiler kallet, står siden som den er. Se 05-LITE-VERSJON.md.

export type Status = {
  utsolgt: boolean
  solgt: number
  igjen: number
  lastet: boolean // true naar et svar faktisk er mottatt
}

const StatusContext = createContext<Status>({
  utsolgt: false,
  solgt: 0,
  igjen: 0,
  lastet: false,
})

export function useStatus() {
  return useContext(StatusContext)
}

export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>({
    utsolgt: false,
    solgt: 0,
    igjen: 0,
    lastet: false,
  })

  useEffect(() => {
    let avbrutt = false
    fetch('/api/status')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!avbrutt) {
          setStatus({
            utsolgt: !!d.utsolgt,
            solgt: Number(d.solgt ?? 0),
            igjen: Number(d.igjen ?? 0),
            lastet: true,
          })
        }
      })
      .catch(() => {
        /* la siden staa som den er */
      })
    return () => {
      avbrutt = true
    }
  }, [])

  return <StatusContext.Provider value={status}>{children}</StatusContext.Provider>
}
