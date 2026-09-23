import { Section } from './Section'
import { Reveal } from './Reveal'
import { KjopKnapp } from './status/KjopKnapp'
import { PlasserIgjen } from './status/PlasserIgjen'
import {
  hentAktivtTreff,
  harKommendeTreff,
  formaterDato,
  formaterKlokke,
  NESTE_MOETE_PLASSHOLDER,
} from '@/lib/config'

export function FinalCta() {
  const EVENT = hentAktivtTreff()
  const kommende = harKommendeTreff()
  const dato = formaterDato(EVENT.starts_at)
  const fra = formaterKlokke(EVENT.starts_at)
  const til = formaterKlokke(EVENT.ends_at)

  const linje = kommende
    ? `Neste møte: ${kapitaliser(dato)} kl. ${fra} til ${til} på ${EVENT.venue}. Maks ${EVENT.capacity} plasser.`
    : `${NESTE_MOETE_PLASSHOLDER}. Følg med øverst på siden for dato. Maks ${EVENT.capacity} plasser per treff.`

  return (
    <Section variant="dark">
      <Reveal className="mx-auto max-w-dm-narrow text-center">
        <h2 className="text-white">Klar for møteaktivitet på høy oktan?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{linje}</p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <KjopKnapp label="Sikre plassen" />
          <PlasserIgjen className="text-sm font-medium text-dm-accent" />
        </div>
      </Reveal>
    </Section>
  )
}

function kapitaliser(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
