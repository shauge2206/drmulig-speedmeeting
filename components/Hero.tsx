import Image from 'next/image'
import { EVENT, formaterDato, formaterKlokke, prisEksMva } from '@/lib/config'
import { KjopKnapp } from './status/KjopKnapp'

// Fullbredde bakgrunnsbilde fra treffet, moerkt petrol-overlegg og stor
// Cormorant-H1. To kall til handling og en rad med korte fakta-piller,
// slik referansen viser. Ken-burns paa bildet og fade-up paa teksten beholdes.
export function Hero() {
  const dato = formaterDato(EVENT.starts_at)
  const fra = formaterKlokke(EVENT.starts_at)
  const til = formaterKlokke(EVENT.ends_at)

  const piller = [
    kapitaliser(dato),
    `Kl. ${fra} til ${til}`,
    EVENT.venue,
    `Maks ${EVENT.capacity} plasser`,
  ]

  return (
    <section className="relative isolate overflow-hidden bg-dm-primary text-white">
      <Image
        src="/img/sm/hero.jpg"
        alt="Deltakere i parallelle SpeedMeeting-samtaler på Regus Kokstad"
        fill
        priority
        sizes="100vw"
        className="dm-kenburns object-cover"
        style={{ borderRadius: 0 }}
      />
      {/* Flatt mørkt petrol-overlegg for lesbarhet */}
      <div
        className="absolute inset-0 -z-0"
        style={{ backgroundColor: 'rgba(33,58,76,0.82)' }}
      />
      <div className="relative mx-auto w-full max-w-dm px-5 py-24 md:px-8 md:py-36">
        <div className="max-w-3xl">
          <p
            className="dm-hero-in dm-eyebrow mb-4 text-dm-accent"
            style={{ animationDelay: '0.05s' }}
          >
            Nettverkstreff i Bergen &bull; Regus Kokstad
          </p>
          <h1 className="dm-hero-in text-white" style={{ animationDelay: '0.15s' }}>
            Speed-dating for bedrifter.
          </h1>
          <p
            className="dm-hero-in mt-5 max-w-2xl text-lg text-white/90 md:text-xl"
            style={{ animationDelay: '0.28s' }}
          >
            Du møter opptil <strong className="font-semibold">21 bedrifter</strong>, én og
            én. Dere pitcher <strong className="font-semibold">3 minutter hver vei</strong>,
            bruker 1 minutt på oppsummering og går videre til neste møte. Møteaktivitet på
            høy oktan.
          </p>

          <div
            className="dm-hero-in mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '0.4s' }}
          >
            <KjopKnapp label={`Kjøp plass – ${prisEksMva} kr`} />
            <a className="dm-btn-outline !border-white !text-white" href="#slik-fungerer">
              Se hvordan det fungerer
            </a>
          </div>

          <div
            className="dm-hero-in mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: '0.5s' }}
          >
            {piller.map((p) => (
              <span
                key={p}
                className="dm-pill cursor-default rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-dm-accent hover:bg-white/20 hover:text-white hover:shadow-[0_8px_22px_-8px_rgba(0,0,0,0.55)]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function kapitaliser(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
