// Sentral konfigurasjon for DrMulig SpeedMeeting.
//
// ALT som endres per treff ligger her. En vanlig maaned: bytt dato, pris og
// Stripe-lenke, commit og push. Vercel bygger automatisk. Se OPPSETT.md.
//
// Feltnavnene under speiler `events`-tabellen i 06-AVANSERT-VERSJON.md, slik at
// en senere oppgradering til database blir billig. Komponentene vet ikke hvor
// dataene kommer fra, de leser bare fra EVENT.

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
  // Settes til true hvis en webhook gaar tapt og treffet likevel er fullt.
  utsolgt_manuell: boolean

  // Paameldingsfrist. Siden stenger ogsaa paa dato, ikke bare paa antall.
  registration_deadline: string // ISO 8601
}

// ---------------------------------------------------------------------------
// INNEVAERENDE TREFF
// ---------------------------------------------------------------------------
export const EVENT: Treff = {
  slug: '2026-11-19',
  title: 'DrMulig SpeedMeeting 19. november 2026',
  starts_at: '2026-11-19T09:00:00+01:00',
  ends_at: '2026-11-19T12:00:00+01:00',
  venue: 'Regus Kokstad, Stjernebygget',
  // TODO (Stian): bekreft eksakt gateadresse/postnr for Regus Kokstad.
  address: 'Regus Kokstad, Stjernebygget, Kokstad i Bergen',
  capacity: 30,
  price_ore: 49500, // 495 kr eks. mva
  vat_rate: 0.25,
  status: 'published',

  // TODO (Stian/Arild): lim inn den ekte Payment Link-URL-en fra Stripe.
  stripe_payment_link_url: 'https://buy.stripe.com/TODO_PAYMENT_LINK',
  // TODO: samme lenkes plink_-id. Ogsaa satt som PAYMENT_LINK_ID i Vercel.
  stripe_payment_link_id: 'plink_TODO',

  utsolgt_manuell: false,
  registration_deadline: '2026-11-19T08:00:00+01:00',
}

// ---------------------------------------------------------------------------
// KOMMENDE TREFF (vises som "neste treff" naar dette er fullt)
// ---------------------------------------------------------------------------
export const NESTE_TREFF = [
  { dato: '10. desember 2026', slug: '2026-12-10' },
  { dato: '14. januar 2027', slug: '2027-01-14' },
]

// ---------------------------------------------------------------------------
// UAVKLART - tydelige plassholdere, ikke oppdiktede verdier
// ---------------------------------------------------------------------------
export const UAVKLART = {
  // TODO (Stian): domenet er ikke bestemt. Byttes overalt naar det er klart.
  domene: 'https://TODO-domene.no',
  // TODO (Arild): er det servering (kaffe/frokost) fra kl. 08.00? Ja/nei
  // avgjoer om vi skriver det i punktlisten eller sier eksplisitt at det
  // ikke serveres. Inntil videre naevnes servering ikke paa siden.
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
// Avledede hjelpere
// ---------------------------------------------------------------------------
export const prisEksMva = Math.round(EVENT.price_ore / 100)
export const prisInkMva = Math.round((EVENT.price_ore * (1 + EVENT.vat_rate)) / 100)

// "tirsdag 6. oktober 2026"
export function formaterDato(iso: string): string {
  return new Intl.DateTimeFormat('nb-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Oslo',
  }).format(new Date(iso))
}

// "08.00"
export function formaterKlokke(iso: string): string {
  return new Intl.DateTimeFormat('nb-NO', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Oslo',
  }).format(new Date(iso))
}
