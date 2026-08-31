import Image from 'next/image'
import { Section, SectionHeading } from './Section'
import { Reveal } from './Reveal'

// Bilder fra treffet 20. mars 2026. Alle sett og verifisert som ekte.
const bilder = [
  { src: '/img/galleri/g1.jpg', alt: 'Deltakere samlet rundt bordet under et SpeedMeeting' },
  { src: '/img/galleri/g2.jpg', alt: 'Arild Pedersen presenterer for rommet' },
  { src: '/img/galleri/g3.jpg', alt: 'Arild leder treffet foran deltakerne' },
  { src: '/img/galleri/g4.jpg', alt: 'Gruppebilde av deltakerne på scenen' },
  { src: '/img/galleri/g5.jpg', alt: 'Deltakerne samlet på scenen med konfetti i lufta' },
  { src: '/img/galleri/g6.jpg', alt: 'Deltakerne samlet til felles bilde' },
]

export function Gallery() {
  return (
    <Section variant="subtle" id="galleri">
      <SectionHeading
        eyebrow="Fra tidligere treff"
        title="Ekte bedrifter, ekte møter"
        intro="Et lite innblikk fra treffet i mars."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {bilder.map((b, i) => (
          <Reveal key={b.src} delay={(i % 3) * 90}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-dm shadow-dm">
              <Image
                src={b.src}
                alt={b.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading={i < 3 ? undefined : 'lazy'}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
