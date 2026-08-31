// Tar imot beskjed fra Stripe naar en betaling fullfoeres eller Payment Link lukkes.
// Verifiserer signaturen manuelt med Web Crypto. Ingen Stripe API-noekkel er involvert.
// Lagrer KUN et tall og et flagg i Redis. Aldri persondata. Aldri logging av innhold.
// Se 05-LITE-VERSJON.md seksjon 5b.
import { Redis } from '@upstash/redis'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const preferredRegion = 'arn1'

const redis = Redis.fromEnv()
const TTL = 60 * 60 * 24 * 30

export async function POST(req: Request) {
  const raw = await req.text()
  const signatur = req.headers.get('stripe-signature') ?? ''

  // Uten denne sjekken kan hvem som helst stenge paameldingen din
  if (!(await erGyldig(raw, signatur, process.env.STRIPE_WEBHOOK_SECRET!))) {
    return new Response('Ugyldig signatur', { status: 400 })
  }

  const hendelse = JSON.parse(raw)
  const slug = process.env.TREFF_SLUG!
  const lenkeId = process.env.PAYMENT_LINK_ID!

  if (hendelse.type === 'payment_link.updated') {
    const lenke = hendelse.data.object
    if (lenke.id === lenkeId && lenke.active === false) {
      await redis.set(`utsolgt:${slug}`, '1', { ex: TTL })
    }
  }

  if (hendelse.type === 'checkout.session.completed') {
    const okt = hendelse.data.object
    if (okt.payment_link === lenkeId && okt.payment_status === 'paid') {
      await redis.incr(`solgt:${slug}`) // atomisk
      await redis.expire(`solgt:${slug}`, TTL)
    }
  }

  // Svar raskt. Stripe proever paa nytt i opptil tre doegn hvis vi feiler.
  // Logg aldri hendelse.data.object: det inneholder navn, e-post og telefon.
  return new Response('ok')
}

async function erGyldig(raw: string, header: string, hemmelighet: string) {
  const deler: Record<string, string> = {}
  for (const bit of header.split(',')) {
    const [k, v] = bit.split('=')
    if (k && v && !(k in deler)) deler[k] = v
  }
  const t = deler.t,
    v1 = deler.v1
  if (!t || !v1) return false

  // Avvis gamle meldinger, beskytter mot replay
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false

  const enc = new TextEncoder()
  const nokkel = await crypto.subtle.importKey(
    'raw',
    enc.encode(hemmelighet),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', nokkel, enc.encode(`${t}.${raw}`))
  const forventet = [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  // Konstant tid, ikke ===
  if (forventet.length !== v1.length) return false
  let ulik = 0
  for (let i = 0; i < forventet.length; i++) {
    ulik |= forventet.charCodeAt(i) ^ v1.charCodeAt(i)
  }
  return ulik === 0
}
