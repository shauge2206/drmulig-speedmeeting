# OPPSETT - DrMulig SpeedMeeting

Denne filen svarer på ett spørsmål: **hva må et menneske gjøre nå?**

Koden er ferdig. Alt under er ting som ikke kan kodes: kontoer, kortopplysninger,
domener og juridikk. Stegene er i den rekkefølgen de må utføres, slik at ingenting
blokkerer noe annet. Skrevet som om du setter opp dette uten å huske noe fra
planleggingen.

> **Merk om hvem som gjør hva:** noe krever Arilds kontoer (Stripe, penger,
> legitimasjon). Resten er Stians jobb. Det står på hvert steg.

---

## 0. Hva som avviker fra den opprinnelige planen (les dette først)

To bevisste valg skiller seg fra `07-MANUELL-SJEKKLISTE.md`:

1. **Kjøpslenken ligger i koden, ikke i en miljøvariabel.** Sjekklisten nevner
   `NEXT_PUBLIC_STRIPE_URL`. Jeg fulgte i stedet `05-LITE-VERSJON.md`, som sier at
   *all* arrangementsdata skal ligge i én fil, `lib/config.ts`. Selve kjøpslenken
   (`stripe_payment_link_url`) endres derfor der, med commit og push, ikke i Vercel.
   Det betyr én ting mindre å holde synkronisert i Vercel, men du må pushe en
   kodeendring hver måned (det gjør du uansett, siden dato og pris også ligger der).

2. **`utsolgt_manuell` er reservebryteren.** I stedet for en løs miljøvariabel
   ligger den manuelle "steng alt"-bryteren i `lib/config.ts` som
   `utsolgt_manuell: false`. Sett den til `true`, commit og push hvis en webhook går
   tapt og treffet likevel er fullt.

Alt annet følger planen.

---

## 1. Miljøvariabler prosjektet faktisk leser

Dette er de eneste variablene koden slår opp. Sett dem i Vercel under
**Project Settings → Environment Variables** (og i `.env.local` lokalt hvis du
tester på egen maskin). Se `.env.example` i repoet.

| Variabel | Verdi | Hvor verdien hentes | Merk |
|---|---|---|---|
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe → Developers → Webhooks → ditt endepunkt → "Signing secret" | **Marker som sensitiv.** Egen verdi i test og i live |
| `PAYMENT_LINK_ID` | `plink_...` | Stripe → Payment Links → lenken → ID i URL/detaljene | Byttes hver måned. Brukes av webhooken og av `/admin`-snarveien |
| `TREFF_SLUG` | `2026-10-06` | Du bestemmer. Samme som `slug` i `lib/config.ts` | Byttes hver måned. Redis-nøklene er per slug |
| `KAPASITET` | `30` | Antall plasser | Endres bare hvis kapasiteten endres |
| `UPSTASH_REDIS_REST_URL` | (auto) | Settes automatisk av Upstash-integrasjonen | Ikke rør manuelt |
| `UPSTASH_REDIS_REST_TOKEN` | (auto) | Settes automatisk av Upstash-integrasjonen | Ikke rør manuelt |

Kjøpslenken (`https://buy.stripe.com/...`) og `plink_...`-id-en settes **også** i
`lib/config.ts` (`stripe_payment_link_url` og `stripe_payment_link_id`). Se steg 0.

**Filer du redigerer for hånd hver måned:** `lib/config.ts`. Der ligger dato,
klokkeslett, pris, adresse, kapasitet, kjøpslenke og listen over neste datoer.
Feltene `TODO`-merket i den filen må fylles inn før lansering (domene, kjøpslenke).

---

## 2. Rekkefølge: fra tom konto til publisert side

### Bolk A - konto og domene (ca. 55 min)

| # | Hva | Hvor | Hvem | Tid |
|---|---|---|---|---|
| A1 | Opprett Stripe-konto på Dr. Mulig AS. Krever org.nr 931 908 847, bankkonto og legitimasjon. **Kontoen må være Arilds**, det er hans selskap Stripe gjør kundekontroll på | stripe.com | **Arild** | 30 min |
| A2 | Slå på tofaktor på Stripe-kontoen. Dette er den eneste døren inn til kundedataene | Stripe → Settings | **Arild** | 5 min |
| A3 | Gi Stian teamtilgang (Administrator eller Developer) | Stripe → Team | **Arild** | 2 min |
| A4 | Bestem og kjøp domene. `.no` krever org.nr, som DrMulig har | Domeneshop e.l. | Stian | 15 min |
| A5 | Avklar med Arild om det serveres kaffe/frokost fra kl. 08.00. Står som `serveringAvklart: false` i `lib/config.ts`. Er svaret ja, legg det inn som et FAQ-punkt og et kulepunkt i "Det inngår i plassen" | - | Stian + Arild | 5 min |

Når domenet er klart: sett det inn i `lib/config.ts` (`UAVKLART.domene`) og i
`DRMULIG.personvernUrl` / `DRMULIG.vilkarUrl` hvis de skal peke et annet sted enn
drmulig.no.

### Bolk B - Stripe, i testmodus først (ca. 45 min)

> **Advarsel:** Gjør alt dette i **testmodus** først. Test og live har *separate*
> produkter, *separate* Payment Links og *separate* webhook-hemmeligheter. Å blande
> dem er den vanligste tabben i hele oppsettet. Se også steg D7.

| # | Hva | Hvor |
|---|---|---|
| B1 | Sett Terms of service URL (`/vilkar`) og Privacy policy URL (`/personvern`) på ditt domene. Uten disse kan du ikke slå på avkrysning for vilkår | Settings → Public details |
| B2 | Last opp logo (`drmulig-landing-assets/images/05-logoer-drmulig/Logo-Black-559x.png`), knappefarge `#213a4c`, bakgrunn `#f5f5f5` | Settings → Branding |
| B3 | Opprett produkt `DrMulig SpeedMeeting 6. oktober 2026`, pris 495 kr eks. mva | Products |
| B4 | Avklar mva med regnskapsfører: enten Stripe Tax, eller legg inn 618,75 kr som totalpris og oppgi mva i teksten | Products / Tax |
| B5 | Opprett Payment Link med alle innstillingene i `05-LITE-VERSJON.md` seksjon 4 (grense **30**, navn + bedrift påkrevd, telefon påkrevd, vilkår + personvern, videresend til `https://<domene>/takk`) | Payment Links |
| B6 | Legg inn de **tre** egendefinerte feltene (hva vil du pitche / dele med de andre / nyhetsbrev). Stripe tillater ikke flere enn tre | Payment Links |
| B7 | Skriv utsolgt-meldingen. Dette er ventelisten din, bruk fem minutter på den | Payment Links |
| B8 | Kopier Payment Link-ID (`plink_...`) → inn i `PAYMENT_LINK_ID` (Vercel) og i `lib/config.ts` | Payment Links |
| B9 | Kopier hele kjøpslenken (`https://buy.stripe.com/...`) → inn i `stripe_payment_link_url` i `lib/config.ts` | Payment Links |
| B10 | Opprett webhook-endepunkt mot `https://<domene>/api/stripe-webhook`, med hendelsene `payment_link.updated` og `checkout.session.completed` | Developers → Webhooks |
| B11 | Kopier signeringshemmeligheten (`whsec_...`) → inn i `STRIPE_WEBHOOK_SECRET` (Vercel), marker som sensitiv | Developers → Webhooks |
| B12 | Legg eventuelt til Monica som teammedlem med lesetilgang | Team |

### Bolk C - GitHub, Vercel og Upstash (ca. 30 min)

| # | Hva | Hvor |
|---|---|---|
| C1 | Opprett GitHub-repo og push prosjektet (repo-roten er `drmulig-speedmeeting/`) | GitHub |
| C2 | Importer repoet i Vercel **under Pro-teamet "Stian's projects"**, ikke som Hobby-prosjekt. Hobby tillater ikke kommersiell bruk | Vercel |
| C3 | Funksjonsregion er allerede satt til `arn1` (Stockholm) i koden (`preferredRegion` i API-rutene). Bekreft at det ikke overstyres | Vercel → Settings → Functions |
| C4 | Legg til Upstash Redis fra Vercels markedsplass, **EU-region**. `UPSTASH_REDIS_REST_URL` og `_TOKEN` settes automatisk | Vercel → Integrations |
| C5 | Legg inn de manuelle miljøvariablene fra tabellen i seksjon 1 | Vercel → Settings → Environment Variables |
| C6 | Koble domenet og sett DNS-postene Vercel oppgir | Vercel → Domains |
| C7 | Slå på Vercel Web Analytics. Cookiefri, så ingen cookiebanner trengs. (`@vercel/analytics` er allerede lagt inn i koden) | Vercel → Analytics |

---

## 3. Test før lansering

### 3a. Test webhooken lokalt (valgfritt, men anbefalt)

```bash
stripe login
stripe listen --forward-to https://<domene>/api/stripe-webhook
stripe trigger checkout.session.completed
```

Da skal telleren `solgt:<slug>` i Upstash øke med 1.

### 3b. Test hele flyten i Stripes testmodus

| # | Hva |
|---|---|
| D1 | Sett grensen midlertidig til **1** på Payment Link |
| D2 | Gjør en testbetaling: kort `4242 4242 4242 4242`, utløp i fremtiden, hvilken som helst CVC og postnummer |
| D3 | Bekreft at du havner på `/takk` og får kvittering på e-post |
| D4 | Sjekk at `payment_link.updated` kom frem: Stripe → Developers → Webhooks → leveringslogg |
| D5 | Last landingssiden på nytt. Knappen skal nå vise **Fulltegnet** og peke på neste dato. (Siden spør `/api/status`, som leser Redis-flagget webhooken satte) |
| D6 | **Sett grensen tilbake til 30** |
| D7 | Gjenta B3-B11 i **live-modus**. Nye `plink_...`, ny `whsec_...`. Begge må inn i Vercel og config på nytt |
| D8 | Sjekk `/`, `/takk`, `/vilkar`, `/personvern`, og at `/admin` sender deg til Stripe-dashbordet for riktig Payment Link |
| D9 | Test på mobil: kontrast, at hero-bildet laster raskt, at knappene er store nok |
| D10 | Gjør én ekte betaling på 495 kr med eget kort i live-modus, verifiser at alt virker, og refunder den i Stripe etterpå |

> **D7 er kritisk.** Glemmer du å bytte til live-verdier, tar siden imot
> testbetalinger som aldri gir penger, og webhooken utløses aldri av ekte kjøp.

**Slik tester du "Fulltegnet" uten å selge noe:** i D1 setter du grensen til 1 og gjør
én testbetaling. Da lukker Stripe lenken, webhooken får `payment_link.updated` med
`active: false`, og siden viser Fulltegnet. Husk D6: sett grensen tilbake til 30.

---

## 4. Juridisk og innhold (før publisering)

| # | Hva | Hvem |
|---|---|---|
| E1 | Få `/vilkar` og `/personvern` lest gjennom av noen med kompetanse. TODO-en i `/vilkar` om avbestillingsfrist må fylles inn | Arild |
| E2 | Godta databehandleravtale hos Stripe, Vercel og Upstash | Stian |
| E3 | Inngå databehandleravtale mellom Stian og Dr. Mulig AS, siden Stian drifter løsningen | Begge |
| E4 | Godkjenn all tekst og bildebruk med Arild | Arild |
| E5 | Bekreft at bildene av deltakere og konferanser (fra 20.03.2026) kan brukes i markedsføring | Arild |

Bildene som er brukt er alle ekte foto fra treffet i mars og portretter fra
referansene. Ingen kjøpte stockbilder er brukt, så det er ingen lisens å sjekke.

---

## 5. Hver måned etter lansering (ca. 20 min)

1. **Stripe:** dupliser produkt og Payment Link, endre dato i navnet, sett grense 30.
2. **Kode (`lib/config.ts`):** bytt `slug`, `starts_at`, `ends_at`, `price_ore`,
   `stripe_payment_link_url`, `stripe_payment_link_id` og listen `NESTE_TREFF`.
   Commit og push. Vercel bygger automatisk.
3. **Vercel:** oppdater `PAYMENT_LINK_ID` og `TREFF_SLUG`, og redeploy. Redis-nøklene
   er per slug, så forrige måneds tall forstyrrer ikke, og de utløper selv etter 30 døgn.
4. **Webhook:** trenger *ikke* opprettes på nytt hvis URL-en er den samme. Samme
   `whsec_...` gjelder videre.
5. **Etter treffet:** eksporter CSV fra Stripe, lag deltakerlisten av de som svarte
   `Ja`, og send den ut som blindkopi eller PDF (aldri med alle adresser synlige).
6. **Nyhetsbrev:** legg de som svarte `Ja` inn i DrMuligs e-postliste.

> **Mest oversette risiko:** CSV-filer med persondata som blir liggende i
> nedlastingsmappen. Slett dem når deltakerlisten er sendt.

---

## 6. Godt å vite om driften

- **Overselging er umulig.** Stripe nekter betaling nummer 31 uansett hva siden viser.
  Webhooken og `/api/status` er kun for at siden selv skal si "Fulltegnet" med en gang.
- **Ingen persondata hos oss.** Redis holder kun et tall og et flagg. All påmelding og
  alle kundedata bor i Stripe. Webhook-innholdet logges aldri.
- **`/admin`** er ingen innlogging, bare en snarvei som sender Arild til Payment
  Link-en i Stripe-dashbordet. Sikkerheten er at Stripe krever pålogging. Ikke lenk
  til den noe sted.
- **Reservebryter:** `utsolgt_manuell: true` i `lib/config.ts` stenger påmeldingen
  uansett hva webhooken sier.
