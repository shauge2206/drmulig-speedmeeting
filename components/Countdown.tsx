'use client'

import { useEffect, useState } from 'react'

// Live nedtelling til neste møte. Rendrer ingenting før den er montert på
// klienten (unngår hydrerings-avvik, siden serveren ikke kjenner klientklokka).
// Datoen ved siden av vises server-side, så no-JS-brukere ser fortsatt når.
export function Countdown({ maalISO }: { maalISO: string }) {
  const [rest, setRest] = useState<number | null>(null)

  useEffect(() => {
    const maal = new Date(maalISO).getTime()
    const tikk = () => setRest(maal - Date.now())
    tikk()
    const id = setInterval(tikk, 1000)
    return () => clearInterval(id)
  }, [maalISO])

  if (rest === null) return null
  if (rest <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-white/40">·</span>
        <span className="font-semibold text-dm-accent">i gang nå</span>
      </span>
    )
  }

  const sek = Math.floor(rest / 1000)
  const deler: [number, string][] = [
    [Math.floor(sek / 86400), 'd'],
    [Math.floor((sek % 86400) / 3600), 't'],
    [Math.floor((sek % 3600) / 60), 'm'],
    [sek % 60, 's'],
  ]

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-white/40">·</span>
      <span className="text-white/75">om</span>
      <span className="inline-flex items-center gap-1 tabular-nums">
        {deler.map(([verdi, enhet]) => (
          <span key={enhet} className="inline-flex items-baseline gap-0.5">
            <b className="font-semibold text-dm-accent">{verdi}</b>
            <span className="text-white/70">{enhet}</span>
          </span>
        ))}
      </span>
    </span>
  )
}
