import type { Metadata } from 'next'
import { PageShell, Prose } from '@/components/PageShell'
import { DRMULIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Personvern - DrMulig SpeedMeeting',
  description:
    'Slik behandler DrMulig personopplysninger ved påmelding til SpeedMeeting, i tråd med personvernforordningen (GDPR).',
}

// NB (Stian/Arild): denne erklaeringen daekker det siden faktisk gjoer i dag.
// Kontroller foer lansering at (1) databehandleravtale er signert med Stripe,
// Vercel og Upstash, (2) lagringstidene under stemmer med rutinene deres, og
// (3) samtykke til deltakerliste faktisk hentes i Stripe-kassen.
export default function PersonvernPage() {
  return (
    <PageShell>
      <h1>Personvernerklæring</h1>
      <Prose>
        <p>
          Denne erklæringen forteller hvordan {DRMULIG.navn} behandler personopplysninger
          når du melder deg på DrMulig SpeedMeeting. Vi behandler opplysningene i tråd med
          personvernforordningen (GDPR) og personopplysningsloven. Selve nettsiden lagrer
          ingen personopplysninger, all påmelding og betaling skjer i Stripes sikre kasse.
        </p>

        <h2 className="text-dm-h4">Behandlingsansvarlig</h2>
        <p>
          {DRMULIG.navn}, org.nr {DRMULIG.orgnr}, er behandlingsansvarlig for
          personopplysningene. Har du spørsmål om personvern, eller vil bruke rettighetene
          dine, kontakt oss på{' '}
          <a href={`mailto:${DRMULIG.epostKontakt}`}>{DRMULIG.epostKontakt}</a> eller{' '}
          <a href={`tel:+47${DRMULIG.telefon.replace(/\s/g, '')}`}>{DRMULIG.telefon}</a>.
        </p>

        <h2 className="text-dm-h4">Hvilke opplysninger vi behandler</h2>
        <ul>
          <li>Navn og bedrift</li>
          <li>E-postadresse og telefonnummer</li>
          <li>
            Betalingsopplysninger (håndteres av Stripe, vi ser aldri fullstendig kortnummer)
          </li>
          <li>
            Svarene dine på de valgfrie feltene i kassen, for eksempel hva du vil pitche, og
            samtykke til deltakerliste
          </li>
        </ul>
        <p>
          Vi ber aldri om helseopplysninger eller andre særlige kategorier
          personopplysninger, og vi bruker ikke opplysningene til automatiserte avgjørelser
          eller profilering.
        </p>

        <h2 className="text-dm-h4">Formål og behandlingsgrunnlag</h2>
        <ul>
          <li>
            <strong>Gjennomføre påmelding og betaling</strong> - behandlingsgrunnlaget er
            avtale (GDPR art. 6 nr. 1 b).
          </li>
          <li>
            <strong>Oppfylle bokføringsplikten</strong> - behandlingsgrunnlaget er rettslig
            forpliktelse (art. 6 nr. 1 c).
          </li>
          <li>
            <strong>Dele deltakerliste</strong> - kun basert på ditt samtykke (art. 6 nr. 1
            a), som du når som helst kan trekke tilbake.
          </li>
          <li>
            <strong>Enkel, anonym besøksstatistikk</strong> - berettiget interesse i å
            forstå bruken av siden (art. 6 nr. 1 f). Se avsnittet om informasjonskapsler.
          </li>
        </ul>

        <h2 className="text-dm-h4">Deltakerliste og deling</h2>
        <p>
          Etter treffet kan vi sende ut en deltakerliste med navn, bedrift og
          kontaktinformasjon, slik at deltakerne kan følge opp hverandre. Dette skjer
          <strong> kun for deg som har samtykket</strong> i kassen. Har du ikke samtykket,
          står du ikke på listen. Utover dette selger eller deler vi aldri opplysningene dine
          med andre, bortsett fra databehandlerne under.
        </p>

        <h2 className="text-dm-h4">Databehandlere</h2>
        <p>
          Vi bruker disse underleverandørene, alle underlagt databehandleravtale som pålegger
          dem å behandle opplysningene kun etter våre instrukser:
        </p>
        <ul>
          <li>
            <strong>Stripe</strong> - påmelding, betaling, kvittering og deltakerregister
          </li>
          <li>
            <strong>Vercel</strong> - drift og hosting av nettsiden, samt anonym statistikk
          </li>
          <li>
            <strong>Upstash</strong> - teller for antall solgte plasser. Her lagres kun et
            tall, aldri personopplysninger
          </li>
        </ul>
        <p>
          Vi tilstreber behandling innenfor EU/EØS. Enkelte leverandører, som Stripe, kan
          overføre opplysninger til land utenfor EØS. Slik overføring skjer i så fall på
          grunnlag av EUs standard personvernbestemmelser (SCC) eller EU-US Data Privacy
          Framework, som sikrer et forsvarlig beskyttelsesnivå.
        </p>

        <h2 className="text-dm-h4">Lagringstid</h2>
        <p>
          Betalings- og bokføringsopplysninger oppbevares så lenge bokføringsloven krever,
          normalt fem år. Deltakerlister beholdes så lenge de er nødvendige for formålet, og
          slettes når du trekker samtykket eller ber om det.
        </p>

        <h2 className="text-dm-h4">Dine rettigheter</h2>
        <p>Så lenge vi behandler opplysninger om deg, har du rett til å:</p>
        <ul>
          <li>få innsyn i hvilke opplysninger vi har om deg</li>
          <li>få rettet uriktige opplysninger</li>
          <li>få slettet opplysninger («retten til å bli glemt»)</li>
          <li>be om begrensning av behandlingen</li>
          <li>protestere mot behandling basert på berettiget interesse</li>
          <li>få opplysningene utlevert i et maskinlesbart format (dataportabilitet)</li>
          <li>trekke tilbake samtykke når som helst, uten at det påvirker lovligheten av behandling gjort før du trakk det</li>
        </ul>
        <p>
          Ta kontakt på{' '}
          <a href={`mailto:${DRMULIG.epostKontakt}`}>{DRMULIG.epostKontakt}</a> for å bruke
          rettighetene dine. Mener du at vi behandler opplysningene dine i strid med reglene,
          kan du klage til{' '}
          <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">
            Datatilsynet
          </a>
          .
        </p>

        <h2 className="text-dm-h4">Informasjonskapsler og statistikk</h2>
        <p>
          Vi bruker ingen informasjonskapsler til sporing eller markedsføring, og siden
          krever derfor ikke noe samtykkebanner. Til enkel, anonym besøksstatistikk bruker vi
          Vercel Web Analytics, som er cookiefri og ikke identifiserer enkeltbesøkende.
        </p>

        <h2 className="text-dm-h4">Endringer</h2>
        <p>
          Vi kan oppdatere denne erklæringen når tjenesten eller regelverket endres. Ved
          vesentlige endringer oppdaterer vi datoen under.
        </p>

        <p className="mt-8 text-sm text-dm-text/70">Sist oppdatert: september 2026.</p>
        <p className="text-sm text-dm-text/70">
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
