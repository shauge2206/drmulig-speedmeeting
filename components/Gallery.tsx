import Image from 'next/image'
import { Section, SectionHeading } from './Section'
import { Reveal } from './Reveal'

// Bilder fra tidligere SpeedMeeting på Regus Kokstad.
const bilder = [
  { src: '/img/sm/g1.jpg', alt: 'Deltakere i flere parallelle SpeedMeeting-samtaler på Regus Kokstad' },
  { src: '/img/sm/g2.jpg', alt: 'Bedrifter i SpeedMeeting-samtaler rundt bord' },
  { src: '/img/sm/g3.jpg', alt: 'Deltakere i samtale ved et bord' },
  { src: '/img/sm/g4.jpg', alt: 'Deltakere i nettverkssamtale' },
  { src: '/img/sm/g5.jpg', alt: 'Arild Pedersen presenterer PSV for deltakerne' },
]

export function Gallery() {
  return (
    <Section variant="dark" id="bilder">
      <SectionHeading
        eyebrow="Fra tidligere treff"
        title="SpeedMeeting ser omtrent slik ut."
        intro="Ekte mennesker, korte samtaler og mange bord i aktivitet samtidig."
        invert
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
