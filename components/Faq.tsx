import { Section, SectionHeading } from './Section'
import { FaqItem } from './FaqItem'
import {
  hentAktivtTreff,
  prisEksMva,
  prisInkMva,
  formaterDato,
  formaterKlokke,
} from '@/lib/config'

// Servering er ikke bekreftet ut over kaffe, og er derfor ikke et eget spørsmål.
export function Faq() {
  const EVENT = hentAktivtTreff()
  const dato = formaterDato(EVENT.starts_at)
  const fra = formaterKlokke(EVENT.starts_at)
  const til = formaterKlokke(EVENT.ends_at)

  const sporsmaal = [
    {
      q: 'Hvordan foregår møtene?',
      a: 'Som speed-dating for bedrifter. Du møter én bedrift av gangen. Dere pitcher tre minutter hver, bruker ett minutt på oppsummering og går videre til neste møte.',
    },
    {
      q: 'Hvor og når møtes vi?',
      a: `${kapitaliser(dato)} kl. ${fra} til ${til} hos ${EVENT.venue}.`,
    },
    {
      q: 'Hvor mange kan delta?',
      a: `Det er maks ${EVENT.capacity} plasser. Hver deltaker kan møte opptil 21 andre bedrifter i løpet av arrangementet.`,
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

function kapitaliser(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
