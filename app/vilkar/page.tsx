import type { Metadata } from 'next'
import { PageShell, Prose } from '@/components/PageShell'
import {
  EVENT,
  prisEksMva,
  prisInkMva,
  DRMULIG,
  formaterDato,
  formaterKlokke,
} from '@/lib/config'

export const metadata: Metadata = {
  title: 'Vilkår - DrMulig SpeedMeeting',
  description: 'Vilkår for kjøp av plass på DrMulig SpeedMeeting.',
}

export default function VilkarPage() {
  const dato = formaterDato(EVENT.starts_at)
  const fra = formaterKlokke(EVENT.starts_at)
  const til = formaterKlokke(EVENT.ends_at)

  return (
    <PageShell>
      <h1>Vilkår</h1>
      <Prose>
        <p>
          Disse vilkårene gjelder når du kjøper plass på DrMulig SpeedMeeting. Arrangør er{' '}
          {DRMULIG.navn}, org.nr {DRMULIG.orgnr}.
        </p>

        <h2 className="text-dm-h4">Arrangementet</h2>
        <p>
          DrMulig SpeedMeeting er et nettverkstreff for bedrifter. Neste treff er {dato},
          kl. {fra} til {til}, i {EVENT.address}. Hvert treff har {EVENT.capacity} plasser.
        </p>

        <h2 className="text-dm-h4">Pris og betaling</h2>
        <p>
          En plass koster {prisEksMva} kr eks. mva ({prisInkMva} kr inkl. mva). Betaling
          skjer med kort i Stripes sikre kasse ved påmelding. Kvittering sendes på e-post.
        </p>

        <h2 className="text-dm-h4">Overdragelse</h2>
        <p>
          Plassen er knyttet til bedriften, ikke til en enkeltperson. Du kan sende en
          kollega i ditt sted. Gi oss beskjed om hvem som kommer på{' '}
          <a href={`mailto:${DRMULIG.epostKontakt}`}>{DRMULIG.epostKontakt}</a>.
        </p>

        <h2 className="text-dm-h4">Avbestilling og refusjon</h2>
        <p>
          Kan du ikke likevel, gi oss beskjed så tidlig som mulig. Refusjon behandles av
          arrangør i Stripe. Ved avlyst treff refunderes hele beløpet.{' '}
          {/* TODO (Arild): bestem konkret avbestillingsfrist og eventuell delvis
          refusjon, og oppdater denne teksten. */}
        </p>

        <h2 className="text-dm-h4">Angrerett</h2>
        <p>
          Angrerettloven gir normalt ikke angrerett på billetter til arrangementer på en
          bestemt dato. Kjøpet er derfor bindende, men vi finner alltid en løsning hvis noe
          kommer i veien. Ta kontakt.
        </p>

        <h2 className="text-dm-h4">Personvern</h2>
        <p>
          Se vår <a href="/personvern">personvernerklæring</a> for hvordan vi behandler
          personopplysninger.
        </p>

        <h2 className="text-dm-h4">Kontakt</h2>
        <p>
          {DRMULIG.navn}, {EVENT.address}.{' '}
          <a href={`mailto:${DRMULIG.epostKontakt}`}>{DRMULIG.epostKontakt}</a>, tlf{' '}
          {DRMULIG.telefon}.
        </p>

        <p className="mt-8 text-sm text-dm-text/70">
          Se også DrMuligs generelle vilkår på{' '}
          <a href={DRMULIG.vilkarUrl} target="_blank" rel="noopener noreferrer">
            drmulig.no
          </a>
          .
        </p>
      </Prose>
    </PageShell>
  )
}
