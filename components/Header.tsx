import Image from 'next/image'
import Link from 'next/link'
import { KjopKnapp } from './status/KjopKnapp'

// Topplinje som i referansen: logo til venstre, ankermeny i midten/hoeyre og
// en tydelig KJOEP PLASS-knapp ytterst. Menyen skjules paa smaa skjermer.
const lenker = [
  { href: '#slik-fungerer', tekst: 'Slik fungerer det' },
  { href: '#bilder', tekst: 'Bilder' },
  { href: '#pris', tekst: 'Pris' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
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

        <nav
          aria-label="Hovedmeny"
          className="hidden items-center gap-8 md:flex"
        >
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
