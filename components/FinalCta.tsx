import { Section } from './Section'
import { Reveal } from './Reveal'
import { KjopKnapp } from './status/KjopKnapp'
import { PlasserIgjen } from './status/PlasserIgjen'
import { EVENT, formaterDato, formaterKlokke } from '@/lib/config'

export function FinalCta() {
  const dato = formaterDato(EVENT.starts_at)
  const fra = formaterKlokke(EVENT.starts_at)
  const til = formaterKlokke(EVENT.ends_at)

  return (
    <Section variant="dark">
      <Reveal className="mx-auto max-w-dm-narrow text-center">
        <h2 className="text-white">Klar for møteaktivitet på høy oktan?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
          {kapitaliser(dato)} kl. {fra} til {til} på {EVENT.venue}. Maks {EVENT.capacity}{' '}
          plasser.
        </p>
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
