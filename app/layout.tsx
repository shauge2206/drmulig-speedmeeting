import type { Metadata } from 'next'
import { Cormorant, Work_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import {
  hentAktivtTreff,
  UAVKLART,
  DRMULIG,
  prisEksMva,
  formaterDato,
  formaterKlokke,
} from '@/lib/config'

// Revalider jevnlig, slik at aktivt treff ruller videre av seg selv kort tid
// etter at et treff er ferdig (uten ny deploy). Gjelder alle sider i treet.
export const revalidate = 3600

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-heading',
  display: 'swap',
})
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

function lagBeskrivelse(EVENT: ReturnType<typeof hentAktivtTreff>): string {
  return `Speed-dating for bedrifter på Regus Kokstad i Bergen. Du møter opptil 21 bedrifter én og én, pitcher 3 minutter hver vei og bytter til neste. ${formaterDato(
    EVENT.starts_at,
  )} kl. ${formaterKlokke(EVENT.starts_at)}. Faglig innslag fra Arild Pedersen og deltakerliste i etterkant. ${EVENT.capacity} plasser, ${prisEksMva} kr eks. mva.`
}

export async function generateMetadata(): Promise<Metadata> {
  const EVENT = hentAktivtTreff()
  const beskrivelse = lagBeskrivelse(EVENT)

  return {
    // TODO: bytt til ekte domene naar det er klart (UAVKLART.domene).
    metadataBase: new URL(UAVKLART.domene),
    title: 'DrMulig SpeedMeeting - nettverkstreff i Bergen',
    description: beskrivelse,
    openGraph: {
      title: 'DrMulig SpeedMeeting - nettverkstreff i Bergen',
      description: beskrivelse,
      type: 'website',
      locale: 'nb_NO',
      images: [{ url: '/img/og.png', width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true },
    icons: { icon: '/img/logoer/favicon.png' },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const EVENT = hentAktivtTreff()
  // JSON-LD av typen Event. Hjelper Google aa forstaa arrangementet.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BusinessEvent',
    name: 'DrMulig SpeedMeeting',
    description: lagBeskrivelse(EVENT),
    startDate: EVENT.starts_at,
    endDate: EVENT.ends_at,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: EVENT.venue,
      address: {
        '@type': 'PostalAddress',
        // TODO (Stian): bekreft eksakt gateadresse/postnr for Regus Kokstad.
        streetAddress: 'Regus Kokstad, Stjernebygget',
        postalCode: '5257',
        addressLocality: 'Kokstad, Bergen',
        addressCountry: 'NO',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: DRMULIG.navn,
      url: DRMULIG.nettsted,
    },
    offers: {
      '@type': 'Offer',
      price: prisEksMva,
      priceCurrency: 'NOK',
      url: EVENT.stripe_payment_link_url,
      availability: 'https://schema.org/InStock',
      validFrom: '2026-09-01T00:00:00+02:00',
    },
  }

  return (
    <html lang="nb" className={`${cormorant.variable} ${workSans.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
