import type { Metadata } from 'next'
import { PageShell, Prose } from '@/components/PageShell'
import { EVENT, formaterDato, formaterKlokke, DRMULIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Takk for påmeldingen - DrMulig SpeedMeeting',
  robots: { index: false, follow: false },
}

export default function TakkPage() {
  const dato = formaterDato(EVENT.starts_at)
  const fra = formaterKlokke(EVENT.starts_at)
  const til = formaterKlokke(EVENT.ends_at)

  return (
    <PageShell>
      <p className="dm-eyebrow mb-3 text-dm-primaryLight">Bekreftet</p>
      <h1>Takk! Plassen din er sikret</h1>
      <Prose>
        <p className="text-lg">
          Vi gleder oss til å se deg på DrMulig SpeedMeeting. Kvitteringen er på vei til
          e-posten din fra Stripe.
        </p>

        <div className="my-6 rounded-dm bg-dm-subtle p-6">
          <h2 className="!mt-0 text-dm-h4">Praktisk informasjon</h2>
          <ul>
            <li>
              <strong>Når:</strong> {dato}, kl. {fra} til {til}
            </li>
            <li>
              <strong>Hvor:</strong> {EVENT.address}
            </li>
            <li>
              <strong>Ta med:</strong> deg selv og en kort pitch. Du får 2,5 minutter i
              hvert møte til å fortelle om deg og bedriften din.
            </li>
          </ul>
        </div>

        <h2 className="text-dm-h4">Hva skjer nå?</h2>
        <ul>
          <li>Du får en påminnelse før treffet.</li>
          <li>
            Etter treffet sender vi deltakerlisten til alle som samtykket til å dele
            kontaktinfo, så du kan følge opp.
          </li>
        </ul>

        <p className="mt-6">
          Spørsmål? Skriv til{' '}
          <a href={`mailto:${DRMULIG.epostKontakt}`}>{DRMULIG.epostKontakt}</a> eller ring{' '}
          {DRMULIG.telefon}.
        </p>
      </Prose>
    </PageShell>
  )
}
