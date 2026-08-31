import Image from 'next/image'
import Link from 'next/link'
import { KjopKnapp } from './status/KjopKnapp'

// Enkel topplinje: DrMulig-logo til venstre, KJOEP PLASS til hoeyre.
// Ingen full meny. Dette er en landingsside med ett maal.
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-dm items-center justify-between px-5 py-3 md:px-8">
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
        <KjopKnapp className="!px-5 !py-3 text-sm md:!px-7" />
      </div>
    </header>
  )
}
