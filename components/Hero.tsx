import Image from 'next/image'
import { EVENT, formaterDato, formaterKlokke, prisEksMva } from '@/lib/config'
import { KjopKnapp } from './status/KjopKnapp'
import { PlasserIgjen } from './status/PlasserIgjen'

// Fullbredde bakgrunnsbilde av rundt 30 deltakere, mørkt petrol-overlegg,
// stor Cormorant-H1 i hvitt. Ett tydelig kall til handling: KJØP PLASS.
export function Hero() {
  const dato = formaterDato(EVENT.starts_at)
  const fra = formaterKlokke(EVENT.starts_at)
  const til = formaterKlokke(EVENT.ends_at)

  return (
    <section className="relative isolate overflow-hidden bg-dm-primary text-white">
      <Image
        src="/img/hero.jpg"
        alt="Deltakere på et DrMulig SpeedMeeting i Bergen"
        fill
        priority
        sizes="100vw"
        className="dm-kenburns object-cover"
        style={{ borderRadius: 0 }}
      />
      {/* Flatt mørkt petrol-overlegg for lesbarhet (ingen gradient) */}
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
            Nettverkstreff i Bergen
          </p>
          <h1 className="dm-hero-in text-white" style={{ animationDelay: '0.15s' }}>
            DrMulig SpeedMeeting
          </h1>
          <p
            className="dm-hero-in mt-5 max-w-2xl text-lg text-white/90 md:text-xl"
            style={{ animationDelay: '0.28s' }}
          >
            Speed-dating for bedrifter. Du møter opptil 29 andre bedrifter én og én,
            pitcher 2,5 minutter hver vei, og bytter til neste på lista. Mange møter og
            mange inntrykk, på bare to timer.
          </p>

          <div
            className="dm-hero-in mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '0.4s' }}
          >
            <KjopKnapp />
            <PlasserIgjen className="text-sm font-medium text-dm-accent" />
          </div>

          <p
            className="dm-hero-in mt-6 text-base text-white/80"
            style={{ animationDelay: '0.5s' }}
          >
            {dato}, kl. {fra} til {til}. {EVENT.address}. {EVENT.capacity} plasser.{' '}
            {prisEksMva} kr eks. mva.
          </p>
        </div>
      </div>
    </section>
  )
}
