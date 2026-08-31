import { Section, SectionHeading } from './Section'
import { Reveal } from './Reveal'

const punkter = [
  'Gründere, rådgivere og andre som driver egen virksomhet og ønsker flere kunder uten å bruke tusenlapper på annonser',
  'Selgere og salgsledere som vil bygge tillit og etterspørsel gjennom relasjoner og innsikt',
  'Bedriftsledere som vil møte andre bedrifter og finne samarbeid',
  'Folk som vil bygge nettverk med mennesker som faktisk er interessert i det de tilbyr',
]

export function ForYou() {
  return (
    <Section variant="subtle">
      <SectionHeading eyebrow="Dette er for deg som" title="Passer treffet for deg?" />
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
        {punkter.map((p, i) => (
          <Reveal key={p} delay={(i % 2) * 90}>
            <div className="dm-card h-full rounded-dm border-l-4 border-dm-primaryLight bg-white p-5 shadow-dm transition-colors hover:border-dm-accent">
              {p}
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-dm-narrow text-center text-dm-primaryLight">
        Kjenner du deg igjen? Da er en av de 30 plassene din.
      </p>
    </Section>
  )
}
