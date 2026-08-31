import { Section, SectionHeading } from './Section'
import { prisEksMva, prisInkMva, NESTE_TREFF } from '@/lib/config'

// Servering (kaffe/frokost fra kl. 08.00) er ikke avklart, og er derfor bevisst
// utelatt her. Legg til et spørsmål når Arild har bestemt det. Se lib/config UAVKLART.
const sporsmaal = [
  {
    q: 'Hvordan foregår møtene?',
    a: 'Som speed-dating for bedrifter. Du møter én bedrift av gangen, ansikt til ansikt. Dere pitcher 2,5 minutter hver, så bytter dere til neste på lista. Ingen scene og ingen sal, bare korte samtaler, en og en.',
  },
  {
    q: 'Kan jeg sende en kollega i mitt sted?',
    a: 'Ja. Plassen er knyttet til bedriften, ikke til en enkeltperson. Gi oss beskjed om hvem som kommer.',
  },
  {
    q: 'Hva om jeg ikke kan denne måneden?',
    a: `Treffet er månedlig, første tirsdag i måneden. Rekker du ikke oktober, er neste treff ${NESTE_TREFF[0].dato}.`,
  },
  {
    q: 'Er det mva på prisen?',
    a: `Ja. Prisen er ${prisEksMva} kr eks. mva, som blir ${prisInkMva} kr inkl. mva per plass.`,
  },
  {
    q: 'Får jeg deltakerlisten?',
    a: 'Ja, hvis du samtykker til å dele navn, bedrift og e-post med de andre. Listen sendes ut kort tid etter treffet, så du kan følge opp mens praten er fersk.',
  },
  {
    q: 'Hvordan betaler jeg?',
    a: 'Direkte i Stripes sikre kasse når du klikker Kjøp plass. Du får kvittering på e-post med en gang.',
  },
]

export function Faq() {
  return (
    <Section variant="subtle" id="faq">
      <SectionHeading eyebrow="Ofte stilte spørsmål" title="Godt å vite" />
      <div className="mx-auto mt-10 max-w-dm-narrow divide-y divide-black/10 rounded-dm bg-white px-6 shadow-dm">
        {sporsmaal.map((s) => (
          <details key={s.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-dm-h5 font-bold text-dm-heading">
              {s.q}
              <span className="flex-none text-dm-primaryLight transition group-open:rotate-45" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-dm-text">{s.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
