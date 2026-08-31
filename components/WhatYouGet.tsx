import { Section, SectionHeading } from './Section'
import { Reveal } from './Reveal'

const punkter = [
  '2,5 minutter til å pitche bedriften din i hvert møte, ansikt til ansikt',
  'Opptil 29 korte bedriftsmøter på to timer',
  'Kort faglig innslag fra Arild Pedersen',
  'Deltakerliste med navn, bedrift og kontaktinfo sendt ut i etterkant',
  'Et helt nettverk av nye kontakter på én morgen',
  '30 års salgserfaring i rommet, ikke bare en arrangør',
]

function Hake() {
  return (
    <svg
      className="mt-1 h-5 w-5 flex-none text-dm-accent"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function WhatYouGet() {
  return (
    <Section variant="dark">
      <SectionHeading eyebrow="Dette får du" title="Det inngår i plassen" invert />
      <ul className="mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-5 md:grid-cols-2">
        {punkter.map((p, i) => (
          <Reveal key={p} as="li" delay={(i % 2) * 90} className="flex gap-3 text-white/90">
            <Hake />
            <span>{p}</span>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
