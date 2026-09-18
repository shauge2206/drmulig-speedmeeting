import { Section, SectionHeading } from './Section'
import { Reveal } from './Reveal'

const steg = [
  {
    n: 1,
    tittel: 'Du møter opp',
    tekst:
      'Kl. 09.00 hos Regus Kokstad i Stjernebygget. Du får oversikt over hvem du skal møte og hvordan runden foregår.',
  },
  {
    n: 2,
    tittel: 'Én bedrift av gangen',
    tekst:
      'Ansikt til ansikt rundt bordet. Ingen scene, ingen salgspresentasjon foran en hel sal.',
  },
  {
    n: 3,
    tittel: '3 minutter hver vei',
    tekst:
      'Du pitcher i tre minutter, den andre bedriften pitcher i tre minutter, og dere bruker ett minutt på kort oppsummering.',
  },
  {
    n: 4,
    tittel: 'Videre til neste',
    tekst:
      'Du flytter deg videre etter planen og kan møte opptil 21 bedrifter i løpet av formiddagen.',
  },
]

export function HowItWorks() {
  return (
    <Section variant="subtle" id="slik-fungerer">
      <SectionHeading
        eyebrow="Slik fungerer et treff"
        title="Mange riktige møter på én formiddag."
        intro="Ingen tilfeldig mingling. Du vet at du skal møte folk, og du rekker faktisk å snakke med dem. Kort, strukturert og effektivt."
      />

      <div className="dm-steps mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steg.map((s, i) => (
          <Reveal key={s.n} delay={(i % 4) * 90} className="h-full">
            <article className="dm-step dm-card group relative flex h-full flex-col rounded-dm border-t-4 border-dm-primaryLight bg-white p-6 shadow-dm transition-colors hover:border-dm-accent">
              <span
                className="mb-4 flex h-11 w-11 flex-none items-center justify-center rounded-full bg-dm-primary font-heading text-lg font-bold text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-dm-accent group-hover:text-dm-primary"
                aria-hidden
              >
                {s.n}
              </span>
              <h3 className="text-dm-h4 text-dm-heading">{s.tittel}</h3>
              <p className="mt-2 text-dm-text">{s.tekst}</p>

              {/* Pil til neste steg. Ligger i mellomrommet mellom kortene og
                  flyter i loop naar et av kortene er mouseover (se globals.css). */}
              {s.n < 4 && (
                <span
                  className="dm-step-arrow pointer-events-none absolute inset-y-0 right-[-1.55rem] z-10 hidden items-center text-dm-primaryLight lg:flex"
                  style={{ animationDelay: `${i * 0.15}s` }}
                  aria-hidden
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12h13M12 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
