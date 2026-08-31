import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Footer } from './Footer'

// Enkel ramme for undersider (/takk, /vilkar, /personvern). Slank topplinje
// uten kjoepsknapp, saa disse sidene ikke trenger StatusProvider.
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex w-full max-w-dm items-center justify-between px-5 py-3 md:px-8">
          <Link href="/" aria-label="DrMulig forside" className="flex items-center">
            <Image
              src="/img/logoer/drmulig-sort.png"
              alt="DrMulig"
              width={559}
              height={130}
              sizes="140px"
              className="h-8 w-auto md:h-9"
              style={{ borderRadius: 0 }}
            />
          </Link>
          <Link href="/" className="text-sm text-dm-primaryLight hover:text-dm-primary">
            Til forsiden
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-dm-narrow px-5 py-14 md:px-8 md:py-20">
        {children}
      </main>
      <Footer />
    </>
  )
}

// Enkel prose-stil for tekstsider.
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 [&_a]:text-dm-primaryLight [&_a]:underline [&_h2]:mt-10 [&_h2]:mb-2 [&_h3]:mt-6 [&_h3]:mb-1 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
      {children}
    </div>
  )
}
