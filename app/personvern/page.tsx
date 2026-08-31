import type { Metadata } from 'next'
import { PageShell, Prose } from '@/components/PageShell'
import { DRMULIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Personvern - DrMulig SpeedMeeting',
  description: 'Slik behandler DrMulig personopplysninger ved påmelding til SpeedMeeting.',
}

export default function PersonvernPage() {
  return (
    <PageShell>
      <h1>Personvernerklæring</h1>
      <Prose>
        <p>
          Denne erklæringen gjelder påmelding til DrMulig SpeedMeeting. Vi lagrer selv
          ingen persondata på denne nettsiden. All påmelding og betaling skjer hos Stripe.
        </p>

        <h2 className="text-dm-h4">Behandlingsansvarlig</h2>
        <p>
          {DRMULIG.navn}, org.nr {DRMULIG.orgnr}, {DRMULIG.epostKontakt}. Kontakt oss for
          innsyn, retting eller sletting.
        </p>

        <h2 className="text-dm-h4">Hvilke opplysninger vi behandler</h2>
        <ul>
          <li>Navn og bedrift</li>
          <li>E-post og telefonnummer</li>
          <li>
            Svar på de valgfrie spørsmålene i kassen (hva du vil pitche, samtykke til
            deltakerliste, samtykke til nyhetsbrev)
          </li>
        </ul>
        <p>
          Opplysningene samles inn i Stripes kasse når du melder deg på. Vi ber aldri om
          helseopplysninger eller andre særlige kategorier.
        </p>

        <h2 className="text-dm-h4">Databehandlere</h2>
        <p>Vi bruker disse underleverandørene, alle med databehandleravtale:</p>
        <ul>
          <li>
            <strong>Stripe</strong> - påmelding, betaling og deltakerregister
          </li>
          <li>
            <strong>Vercel</strong> - drift av nettsiden (EU-region)
          </li>
          <li>
            <strong>Upstash</strong> - teller for antall solgte plasser (EU-region). Her
            lagres kun et tall, aldri persondata
          </li>
        </ul>
        <p>Data behandles i EU/EØS.</p>

        <h2 className="text-dm-h4">Behandlingsgrunnlag</h2>
        <ul>
          <li>Avtale, for påmelding og betaling</li>
          <li>Rettslig forpliktelse, for bokføring</li>
          <li>Samtykke, for deltakerlisten og for nyhetsbrev</li>
        </ul>

        <h2 className="text-dm-h4">Lagringstid</h2>
        <p>
          Betalingsopplysninger oppbevares hos Stripe og må i henhold til bokføringsloven
          beholdes i fem år. Deltakerlister og markedsføringssamtykker slettes når de ikke
          lenger er nødvendige, eller når du trekker samtykket.
        </p>

        <h2 className="text-dm-h4">Dine rettigheter</h2>
        <p>
          Du har rett til innsyn, retting og sletting av egne opplysninger, og til å trekke
          tilbake samtykke når som helst. Ta kontakt på{' '}
          <a href={`mailto:${DRMULIG.epostKontakt}`}>{DRMULIG.epostKontakt}</a>. Du kan også
          klage til Datatilsynet.
        </p>

        <h2 className="text-dm-h4">Informasjonskapsler</h2>
        <p>
          Vi bruker ingen informasjonskapsler til sporing. Til enkel, anonym
          besøksstatistikk bruker vi Vercel Web Analytics, som er cookiefri.
        </p>

        <p className="mt-8 text-sm text-dm-text/70">
          Se også DrMuligs generelle personvernerklæring på{' '}
          <a href={DRMULIG.personvernUrl} target="_blank" rel="noopener noreferrer">
            drmulig.no
          </a>
          .
        </p>
      </Prose>
    </PageShell>
  )
}
