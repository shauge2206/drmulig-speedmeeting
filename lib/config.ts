// Sentral konfigurasjon for DrMulig SpeedMeeting.
//
// Alt som er LIKT for hvert treff ligger i TREFF_MAL (sted, tid, pris, kapasitet,
// Stripe-lenke). Selve DATOENE ligger i TREFF_DATOER. Siden viser automatisk det
// foerste treffet som ikke er ferdig ennaa, og ruller videre til neste naar
// datoen er passert. Ny maaned: legg til en dato i TREFF_DATOER, commit og push.
//
// Komponentene henter aktivt treff med hentAktivtTreff() ved render, og sidene
// revalideres jevnlig (se `revalidate` i app/layout.tsx), slik at overgangen
// skjer av seg selv kort tid etter at et treff er ferdig.

export type Treff = {
  // Speiler events-tabellen
  slug: string
  title: string
  starts_at: string // ISO 8601, med tidssone
  ends_at: string // ISO 8601, med tidssone
  venue: string
  address: string
  capacity: number
  price_ore: number // eks. mva, i oere
  vat_rate: number // f.eks. 0.25
  status: 'draft' | 'published' | 'cancelled'

  // Lite-versjon: betaling via Stripe Payment Link
  stripe_payment_link_url: string // hele lenken, KJOEP PLASS peker hit
  stripe_payment_link_id: string // plink_..., speiler PAYMENT_LINK_ID

  // Manuell reservebryter. Overstyrer alt. Se 05-LITE-VERSJON.md.
  utsolgt_manuell: boolean

  // Paameldingsfrist. Siden stenger ogsaa paa dato, ikke bare paa antall.
  registration_deadline: string // ISO 8601
}

// ---------------------------------------------------------------------------
// FELLES FOR ALLE TREFF (endres sjelden)
// ---------------------------------------------------------------------------
const TREFF_MAL = {
  venue: 'Regus Kokstad, Stjernebygget',
  // TODO (Stian): bekreft eksakt gateadresse/postnr for Regus Kokstad.
  address: 'Regus Kokstad, Stjernebygget, Kokstad i Bergen',
  capacity: 30,
  price_ore: 49500, // 495 kr eks. mva
  vat_rate: 0.25,
  status: 'published' as const,
  // TODO (Stian/Arild): lim inn den ekte Payment Link-URL-en fra Stripe.
  stripe_payment_link_url: 'https://buy.stripe.com/TODO_PAYMENT_LINK',
  stripe_payment_link_id: 'plink_TODO',
  utsolgt_manuell: false,
  startKlokke: '09:00', // lokal tid (Oslo), samme for alle treff
  sluttKlokke: '12:00',
}

// ---------------------------------------------------------------------------
// KOMMENDE TREFF - legg til nye datoer nederst. Format: 'YYYY-MM-DD'.
// Datoer som er passert kan bli staaende; de filtreres bort automatisk.
// ---------------------------------------------------------------------------
export const TREFF_DATOER = [
  '2026-11-19',
  '2026-12-10',
  '2027-01-14',
]

// ---------------------------------------------------------------------------
// Felles verdier som klientkomponenter og API leser direkte
// ---------------------------------------------------------------------------
export const KAPASITET = TREFF_MAL.capacity
export const STRIPE_URL = TREFF_MAL.stripe_payment_link_url
export const UTSOLGT_MANUELL = TREFF_MAL.utsolgt_manuell
export const prisEksMva = Math.round(TREFF_MAL.price_ore / 100)
export const prisInkMva = Math.round(
  (TREFF_MAL.price_ore * (1 + TREFF_MAL.vat_rate)) / 100,
)

// ---------------------------------------------------------------------------
// Aktivt og kommende treff (beregnes ved render)
// ---------------------------------------------------------------------------

// Riktig tidssone-offset for Oslo paa en gitt dato (+01:00 vinter, +02:00 sommer).
function osloOffset(dato: string): string {
  const d = new Date(`${dato}T12:00:00Z`)
  const navn =
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Oslo',
      timeZoneName: 'shortOffset',
    })
      .formatToParts(d)
      .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+1'
  const timer = Math.abs(parseInt(navn.replace(/[^0-9+-]/g, ''), 10)) || 1
  return `+0${timer}:00`
}

// Bygg et fullstendig Treff fra en dato + felles mal.
function byggTreff(dato: string): Treff {
  const off = osloOffset(dato)
  const startIso = `${dato}T${TREFF_MAL.startKlokke}:00${off}`
  const sluttIso = `${dato}T${TREFF_MAL.sluttKlokke}:00${off}`
  return {
    slug: dato,
    title: `DrMulig SpeedMeeting ${formaterDato(startIso)}`,
    starts_at: startIso,
    ends_at: sluttIso,
    venue: TREFF_MAL.venue,
    address: TREFF_MAL.address,
    capacity: TREFF_MAL.capacity,
    price_ore: TREFF_MAL.price_ore,
    vat_rate: TREFF_MAL.vat_rate,
    status: TREFF_MAL.status,
    stripe_payment_link_url: TREFF_MAL.stripe_payment_link_url,
    stripe_payment_link_id: TREFF_MAL.stripe_payment_link_id,
    utsolgt_manuell: TREFF_MAL.utsolgt_manuell,
    registration_deadline: startIso,
  }
}

function sorterteDatoer(): string[] {
  return [...TREFF_DATOER].sort()
}

// Det aktive treffet: foerste dato der sluttidspunktet ikke er passert. Naar
// alle er passert, vises det siste, slik at siden aldri staar uten et treff.
export function hentAktivtTreff(naa: Date = new Date()): Treff {
  const naaMs = naa.getTime()
  const datoer = sorterteDatoer()
  const kommende = datoer.find(
    (d) => new Date(byggTreff(d).ends_at).getTime() > naaMs,
  )
  const valgt = kommende ?? datoer[datoer.length - 1] ?? TREFF_DATOER[0]
  return byggTreff(valgt)
}

// Treff ETTER det aktive, til "neste treff"-melding naar noe er fullt.
export function hentKommendeTreff(
  naa: Date = new Date(),
): { dato: string; slug: string }[] {
  const aktiv = hentAktivtTreff(naa)
  return sorterteDatoer()
    .filter((d) => d > aktiv.slug)
    .map((d) => ({ dato: formaterDato(byggTreff(d).starts_at), slug: d }))
}

// ---------------------------------------------------------------------------
// UAVKLART - tydelige plassholdere, ikke oppdiktede verdier
// ---------------------------------------------------------------------------
export const UAVKLART = {
  // TODO (Stian): domenet er ikke bestemt. Byttes overalt naar det er klart.
  domene: 'https://TODO-domene.no',
  serveringAvklart: false,
}

// ---------------------------------------------------------------------------
// FASTE OPPLYSNINGER OM DRMULIG (endres sjelden)
// ---------------------------------------------------------------------------
export const DRMULIG = {
  navn: 'Dr. Mulig AS',
  orgnr: '931 908 847',
  vert: 'Arild Pedersen',
  vertTittel: 'Salgscoach og forretningsrådgiver',
  epostKontakt: 'kontakt@drmulig.no',
  epostArild: 'arild@drmulig.no',
  telefon: '930 55 885',
  nettsted: 'https://drmulig.no',
  personvernUrl: 'https://drmulig.no/personvern/', // TODO: bekreft eksakt URL
  vilkarUrl: 'https://drmulig.no/vilkar/', // TODO: bekreft eksakt URL
  sosialt: {
    linkedin: 'https://www.linkedin.com/in/arildpedersen/',
    facebook: 'https://www.facebook.com/drmulig/',
    instagram: 'https://www.instagram.com/drmulig/',
  },
}

// ---------------------------------------------------------------------------
// Datohjelpere
// ---------------------------------------------------------------------------

// "torsdag 19. november 2026"
export function formaterDato(iso: string): string {
  return new Intl.DateTimeFormat('nb-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Oslo',
  }).format(new Date(iso))
}

// "09.00"
export function formaterKlokke(iso: string): string {
  return new Intl.DateTimeFormat('nb-NO', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Oslo',
  }).format(new Date(iso))
}
