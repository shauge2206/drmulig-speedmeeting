import Image from 'next/image'
import { Section } from './Section'
import { Reveal } from './Reveal'

const punkter = [
  {
    tittel: 'Opptil 21 bedriftsmøter',
    tekst: 'Korte, strukturerte møter ansikt til ansikt.',
  },
  {
    tittel: '3 minutter pitch hver vei',
    tekst: 'Pluss 1 minutt til oppsummering før neste møte.',
  },
  {
    tittel: 'Kort faglig innslag',
    tekst: 'Praktiske råd fra Arild Pedersen om pitch, nettverk og oppfølging.',
  },
  {
    tittel: 'Deltakerliste',
    tekst:
      'Navn, bedrift og kontaktinformasjon sendes ut etter treffet der deltakerne har samtykket.',
  },
  {
    tittel: 'Kaffe og møteenergi',
    tekst:
      'Du møter folk som faktisk har kommet for å snakke forretning og bygge relasjoner.',
  },
]

function Hake() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 flex-none text-dm-accent"
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
    <Section variant="white">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <p className="dm-eyebrow mb-3 text-dm-primaryLight">Dette får du</p>
          <h2>Det inngår i plassen.</h2>
          <ul className="mt-8 space-y-5">
            {punkter.map((p) => (
              <li key={p.tittel} className="flex gap-3">
                <Hake />
                <span>
                  <span className="block font-semibold text-dm-heading">{p.tittel}</span>
                  <span className="block text-dm-text">{p.tekst}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="group overflow-hidden rounded-dm shadow-dm">
          <Image
            src="/img/sm/inkludert.jpg"
            alt="Deltakere i faglig nettverkssamtale på et SpeedMeeting"
            width={1200}
            height={900}
            sizes="(max-width: 1024px) 100vw, 560px"
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Reveal>
      </div>
    </Section>
  )
}
