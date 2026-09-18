import Image from 'next/image'
import { Section } from './Section'

// Kundelogoer fra 06-logoer-kunder. Vises gråtonet på lys bakgrunn.
// Overskrift som på drmulig.no. Disse er DrMuligs kunder og partnere,
// ikke nødvendigvis deltakere på treffet.
const logoer = [
  { src: '/img/kunder/bemanning.png', navn: 'Bemanning' },
  { src: '/img/kunder/Qualified.png', navn: 'Qualified' },
  { src: '/img/kunder/cibes.png', navn: 'Cibes Lift' },
  { src: '/img/kunder/Entreprenerdy.png', navn: 'Entreprenerdy' },
  { src: '/img/kunder/Excellerate.png', navn: 'Excellerate' },
  { src: '/img/kunder/bitpro.png', navn: 'Bitpro' },
  { src: '/img/kunder/3c.png', navn: '3C' },
  { src: '/img/kunder/gccd.png', navn: 'GCCD' },
  { src: '/img/kunder/visere.png', navn: 'Visere' },
  { src: '/img/kunder/allier.png', navn: 'Allier Gruppen' },
]

export function LogoStrip() {
  return (
    <Section variant="subtle">
      <p className="dm-eyebrow mb-8 text-center text-dm-primaryLight">
        Våre kunder og partnere
      </p>
      <div className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
        {logoer.map((l) => (
          <div key={l.src} className="relative mx-auto h-12 w-full max-w-[140px]">
            <Image
              src={l.src}
              alt={l.navn}
              fill
              sizes="140px"
              className="object-contain opacity-60 grayscale transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
              style={{ borderRadius: 0 }}
            />
          </div>
        ))}
      </div>
    </Section>
  )
}
