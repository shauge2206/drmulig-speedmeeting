import { Section } from './Section'
import { Reveal } from './Reveal'
import { KjopKnapp } from './status/KjopKnapp'
import { PlasserIgjen } from './status/PlasserIgjen'
import { EVENT, formaterDato, formaterKlokke } from '@/lib/config'

export function FinalCta() {
  const dato = formaterDato(EVENT.starts_at)
  const fra = formaterKlokke(EVENT.starts_at)

  return (
    <Section variant="dark">
      <Reveal className="mx-auto max-w-dm-narrow text-center">
        <h2 className="text-white">Klar for å møte 29 andre bedrifter?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
          {dato}, kl. {fra}, i Bergen. Opptil 29 korte møter på to timer, 2,5 minutter til
          å pitche i hvert, og en deltakerliste du kan følge opp.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <KjopKnapp />
          <PlasserIgjen className="text-sm font-medium text-dm-accent" />
        </div>
      </Reveal>
    </Section>
  )
}
