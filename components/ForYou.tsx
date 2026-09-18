import { Section, SectionHeading } from './Section'
import { Reveal } from './Reveal'

const punkter = [
  {
    tittel: 'Gründere og eiere',
    tekst: 'Som vil finne kunder, samarbeidspartnere og nye innganger til markedet.',
  },
  {
    tittel: 'Selgere og salgsledere',
    tekst: 'Som vil bygge pipeline gjennom relasjoner, ikke bare kalde henvendelser.',
  },
  {
    tittel: 'Bedriftsledere',
    tekst: 'Som vil møte andre bedrifter og oppdage konkrete samarbeidsmuligheter.',
  },
  {
    tittel: 'Rådgivere og tjenesteleverandører',
    tekst: 'Som trenger flere relevante mennesker å snakke med på kort tid.',
  },
]

export function ForYou() {
  return (
    <Section variant="subtle" id="passer">
      <SectionHeading
        eyebrow="Hvem passer det for?"
        title="For deg som vil møte folk, ikke bare samle visittkort."
      />
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
        {punkter.map((p, i) => (
          <Reveal key={p.tittel} delay={(i % 2) * 90}>
            <div className="dm-card h-full rounded-dm border-l-4 border-dm-primaryLight bg-white p-6 shadow-dm transition-colors hover:border-dm-accent">
              <h3 className="text-dm-h5 text-dm-heading">{p.tittel}</h3>
              <p className="mt-2 text-dm-text">{p.tekst}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
