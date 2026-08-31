# DrMulig SpeedMeeting

Landingsside for DrMuligs månedlige nettverkstreff i Bergen. Selger plasser via en
Stripe Payment Link. Ingen egen database. Bygget etter `05-LITE-VERSJON.md`.

## Stack

Next.js (App Router) · TypeScript · Tailwind · Upstash Redis · Vercel Pro.

## Kom i gang lokalt

```bash
npm install
cp .env.example .env.local   # fyll inn verdier, se OPPSETT.md
rm -rf .next && npm run dev
```

Uten Redis-variabler kjører siden fint, men `/api/status` svarer 500 og siden faller
tilbake til standardteksten "30 plasser per treff". Det er meningen (progressiv
forbedring).

## Struktur

- `lib/config.ts` - **all arrangementsdata**. Rediger her hver måned.
- `app/page.tsx` - landingssiden, satt sammen av `components/`.
- `app/api/stripe-webhook/` - tar imot Stripe, lukker påmeldingen. HMAC-verifisert.
- `app/api/status/` - siden spør denne for plasser igjen.
- `app/{takk,vilkar,personvern}/` - undersider.
- `/admin` - redirect til Stripe-dashbordet (`next.config.js`), ingen egen innlogging.

## Sette opp for produksjon

Se **`OPPSETT.md`**. Den forteller steg for steg hva et menneske må gjøre: Stripe,
Vercel, Upstash, domene, testing og månedlig rutine.
