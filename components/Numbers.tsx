import { Section, SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { EVENT } from '@/lib/config'

// "SpeedMeeting i tall" fra referansen. Fire nokkeltall paa moerk petrol,
// store Cormorant-tall i signalgult.
const tall = [
  { verdi: '21', tekst: 'bedrifter du kan møte' },
  { verdi: '3+3', tekst: 'minutter pitch per møte' },
  { verdi: '1', tekst: 'minutt til oppsummering' },
  { verdi: String(EVENT.capacity), tekst: 'plasser – maks' },
]

export function Numbers() {
  return (
    <Section variant="dark">
      <SectionHeading
        eyebrow="SpeedMeeting i tall"
        title="Tre timer. En hel bunke nye muligheter."
        invert
      />
      <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {tall.map((t, i) => (
          <Reveal key={t.tekst} delay={(i % 4) * 90} className="h-full">
            <div className="dm-card flex h-full flex-col items-center rounded-dm border border-white/10 bg-white/5 p-6 text-center">
              <span className="font-heading text-5xl font-bold text-dm-accent md:text-6xl">
                {t.verdi}
              </span>
              <span className="mt-2 text-white/85">{t.tekst}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
