import Image from 'next/image'
import Link from 'next/link'
import { DRMULIG, hentAktivtTreff } from '@/lib/config'

export function Footer() {
  const EVENT = hentAktivtTreff()
  return (
    <footer className="bg-[#182b38] text-white/80">
      <div className="mx-auto grid w-full max-w-dm gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Image
            src="/img/logoer/drmulig-hvit.png"
            alt="DrMulig"
            width={559}
            height={130}
            sizes="160px"
            className="h-9 w-auto"
            style={{ borderRadius: 0 }}
          />
          <p className="mt-4 max-w-xs text-sm">
            SpeedMeeting er et nettverkstreff der bedrifter møter bedrifter. Vert er{' '}
            {DRMULIG.vert}.
          </p>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 text-dm-h6 text-white">Kontakt</h3>
          <p>{DRMULIG.navn}</p>
          <p>{EVENT.address}</p>
          <p className="mt-2">
            <a className="hover:text-dm-accent" href={`mailto:${DRMULIG.epostKontakt}`}>
              {DRMULIG.epostKontakt}
            </a>
          </p>
          <p>
            <a className="hover:text-dm-accent" href={`tel:+47${DRMULIG.telefon.replace(/\s/g, '')}`}>
              {DRMULIG.telefon}
            </a>
          </p>
          <p className="mt-1 text-white/50">Org.nr {DRMULIG.orgnr}</p>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 text-dm-h6 text-white">Mer</h3>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-dm-accent" href="/vilkar">
                Vilkår
              </Link>
            </li>
            <li>
              <Link className="hover:text-dm-accent" href="/personvern">
                Personvern
              </Link>
            </li>
            <li>
              <a className="hover:text-dm-accent" href={DRMULIG.nettsted} target="_blank" rel="noopener noreferrer">
                drmulig.no
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-4">
            <a href={DRMULIG.sosialt.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-dm-accent">
              LinkedIn
            </a>
            <a href={DRMULIG.sosialt.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-dm-accent">
              Facebook
            </a>
            <a href={DRMULIG.sosialt.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-dm-accent">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-dm px-5 py-5 text-xs text-white/50 md:px-8">
          &copy; {new Date().getFullYear()} {DRMULIG.navn}. Alle rettigheter forbeholdt.
        </div>
      </div>
    </footer>
  )
}
