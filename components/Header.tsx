import Image from 'next/image'
import Link from 'next/link'
import { KjopKnapp } from './status/KjopKnapp'
import { Countdown } from './Countdown'
import {
  hentAktivtTreff,
  harKommendeTreff,
  formaterDato,
  NESTE_MOETE_PLASSHOLDER,
} from '@/lib/config'

// Topplinje: en nedtellingsstripe med neste møte + live nedtelling øverst, og
// under den logo, ankermeny og en tydelig KJOEP PLASS-knapp.
const lenker = [
  { href: '#slik-fungerer', tekst: 'Slik fungerer det' },
  { href: '#bilder', tekst: 'Bilder' },
  { href: '#pris', tekst: 'Pris' },
]

export function Header() {
  const EVENT = hentAktivtTreff()
  const kommende = harKommendeTreff()
  const dato = formaterDato(EVENT.starts_at)

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      {/* Nedtellingsstripe: neste møte + live nedtelling. Uten kommende treff
          vises plassholderen i stedet, uten nedtelling. */}
      <div className="bg-dm-primary text-white">
        <div className="mx-auto flex w-full max-w-dm flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 px-5 py-2 text-center text-sm md:px-8">
          {kommende ? (
            <>
              <span className="font-medium">
                Neste SpeedMeeting: {kapitaliser(dato)}
              </span>
              <Countdown maalISO={EVENT.starts_at} />
            </>
          ) : (
            <span className="font-medium">{NESTE_MOETE_PLASSHOLDER}</span>
          )}
        </div>
      </div>

      {/* Hovedrad */}
      <div className="mx-auto flex w-full max-w-dm items-center justify-between gap-6 px-5 py-3 md:px-8">
        <Link href="/" aria-label="DrMulig forside" className="flex items-center">
          <Image
            src="/img/logoer/drmulig-sort.png"
            alt="DrMulig"
            width={559}
            height={130}
            priority
            sizes="140px"
            className="h-8 w-auto md:h-9"
            style={{ borderRadius: 0 }}
          />
        </Link>

        <nav aria-label="Hovedmeny" className="hidden items-center gap-8 md:flex">
          {lenker.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-dm-primary transition-colors hover:text-dm-primaryLight"
            >
              {l.tekst}
            </a>
          ))}
        </nav>

        <KjopKnapp label="Sikre plassen" className="!px-5 !py-3 text-sm md:!px-7" />
      </div>
    </header>
  )
}

function kapitaliser(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
