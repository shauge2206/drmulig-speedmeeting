'use client'

import { useEffect, useState } from 'react'

type Variant = 'kompakt' | 'stor'

// Live nedtelling til neste møte. Rendrer ingenting (eller reservert høyde i stor
// variant) før den er montert på klienten, for å unngå hydrerings-avvik siden
// serveren ikke kjenner klientklokka.
export function Countdown({
  maalISO,
  variant = 'kompakt',
}: {
  maalISO: string
  variant?: Variant
}) {
  const [rest, setRest] = useState<number | null>(null)

  useEffect(() => {
    const maal = new Date(maalISO).getTime()
    const tikk = () => setRest(maal - Date.now())
    tikk()
    const id = setInterval(tikk, 1000)
    return () => clearInterval(id)
  }, [maalISO])

  if (rest === null) {
    // Reserver høyde i stor variant så layouten ikke hopper når den monteres.
    return variant === 'stor' ? <div className="h-[92px] sm:h-[104px]" aria-hidden /> : null
  }

  const forbi = rest <= 0
  const sek = Math.max(0, Math.floor(rest / 1000))
  const d = Math.floor(sek / 86400)
  const t = Math.floor((sek % 86400) / 3600)
  const m = Math.floor((sek % 3600) / 60)
  const s = sek % 60

  if (variant === 'stor') {
    if (forbi) {
      return (
        <p className="font-heading text-3xl font-bold text-dm-accent">I gang nå</p>
      )
    }
    const enheter: [number, string][] = [
      [d, 'Dager'],
      [t, 'Timer'],
      [m, 'Min'],
      [s, 'Sek'],
    ]
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {enheter.map(([verdi, navn]) => (
          <div
            key={navn}
            className="rounded-dm border border-white/15 bg-white/10 px-1 py-3 text-center backdrop-blur"
          >
            <div className="font-heading text-4xl font-bold tabular-nums text-dm-accent sm:text-5xl">
              {String(verdi).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[0.7rem] uppercase tracking-wide text-white/70">
              {navn}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // kompakt variant (brukes i topp-stripa hvis ønsket)
  if (forbi) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-white/40">·</span>
        <span className="font-semibold text-dm-accent">i gang nå</span>
      </span>
    )
  }
  const deler: [number, string][] = [
    [d, 'd'],
    [t, 't'],
    [m, 'm'],
    [s, 's'],
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
