import { Section, SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { KjopKnapp } from './status/KjopKnapp'
import { PlasserIgjen } from './status/PlasserIgjen'
import {
  EVENT,
  prisEksMva,
  prisInkMva,
  formaterDato,
  formaterKlokke,
} from '@/lib/config'

const inkludert = [
  'Opptil 21 bedriftsmøter',
  '3 minutter pitch hver vei + 1 minutt oppsummering',
  'Kort faglig innslag',
  'Deltakerliste i etterkant',
]

export function Pricing() {
  const dato = formaterDato(EVENT.starts_at)
  const fra = formaterKlokke(EVENT.starts_at)
  const til = formaterKlokke(EVENT.ends_at)

  return (
    <Section variant="primaryLight" id="pris">
      <SectionHeading eyebrow="Pris og påmelding" title="Sikre plassen din." invert />

      <Reveal className="mx-auto mt-10 max-w-4xl">
        <div className="dm-card grid gap-0 overflow-hidden rounded-dm bg-white text-dm-text shadow-dm md:grid-cols-[1.4fr_1fr]">
          {/* Venstre: pris og hva som inngår */}
          <div className="p-8 md:p-10">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-5xl font-bold text-dm-heading">
                {prisEksMva} kr
              </span>
              <span className="text-dm-text">per person, eks. mva.</span>
            </div>
            <p className="mt-1 text-sm text-dm-primaryLight">
              {prisInkMva} kr inkl. mva.
            </p>

            <hr className="my-6 border-black/10" />

            <ul className="space-y-3">
              {inkludert.map((p) => (
                <li key={p} className="flex gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-none text-dm-primaryLight"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Høyre: dato, sted og kjøpsknapp */}
          <aside className="flex flex-col justify-center gap-4 border-t border-black/10 bg-dm-subtle p-8 md:border-l md:border-t-0 md:p-10">
            <h3 className="text-dm-h5 text-dm-heading">{kapitaliser(dato)}</h3>
            <p className="text-dm-text">
              <strong>
                Kl. {fra} til {til}
              </strong>
              <br />
              {EVENT.venue}
              <br />
              Maks {EVENT.capacity} plasser
            </p>
            <div className="mt-2 flex flex-col items-start gap-3">
              <KjopKnapp label={`Kjøp plass – ${prisEksMva} kr`} />
              <PlasserIgjen className="text-sm font-medium text-dm-primaryLight" />
            </div>
            <p className="text-sm text-dm-text/80">
              Navn, bedrift, e-post og telefon fyller du inn i Stripes sikre kasse. Du får
              kvittering på e-post med en gang.
            </p>
          </aside>
        </div>
      </Reveal>
    </Section>
  )
}

function kapitaliser(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
