import { Section, SectionHeading } from './Section'
import { FaqItem } from './FaqItem'
import { KAPASITET, prisEksMva, prisInkMva } from '@/lib/config'

// Konkret dato/tid staar ikke her lenger. Neste moete med nedtelling ligger
// oeverst paa siden; FAQ peker dit i stedet.
export function Faq() {
  const sporsmaal = [
    {
      q: 'Hvordan foregår møtene?',
      a: 'Som speed-dating for bedrifter. Du møter én bedrift av gangen. Dere pitcher tre minutter hver, bruker ett minutt på oppsummering og går videre til neste møte.',
    },
    {
      q: 'Når og hvor ofte er det SpeedMeeting?',
      a: 'Vi planlegger speed-dating-møter for bedrifter regelmessig. Følg med øverst på siden, der ligger alltid neste møte med dato og nedtelling.',
    },
    {
      q: 'Hvor mange kan delta?',
      a: `Det er maks ${KAPASITET} plasser. Hver deltaker kan møte opptil 21 andre bedrifter i løpet av arrangementet.`,
    },
    {
      q: 'Kan jeg sende en kollega i mitt sted?',
      a: 'Ja. Gi beskjed om hvem som kommer, slik at deltakerlisten blir riktig.',
    },
    {
      q: 'Får jeg deltakerlisten?',
      a: 'Ja, der deltakerne har samtykket til deling av navn, bedrift og kontaktinformasjon. Listen sendes ut kort tid etter treffet.',
    },
    {
      q: 'Hva koster det?',
      a: `${prisEksMva} kroner per person eks. mva. (${prisInkMva} kroner inkl. mva.).`,
    },
  ]

  return (
    <Section variant="subtle" id="faq">
      <SectionHeading eyebrow="Ofte stilte spørsmål" title="Godt å vite." />
      <div className="mx-auto mt-10 max-w-dm-narrow divide-y divide-black/10 rounded-dm bg-white px-6 shadow-dm">
        {sporsmaal.map((s) => (
          <FaqItem key={s.q} q={s.q} a={s.a} />
        ))}
      </div>
    </Section>
  )
}
