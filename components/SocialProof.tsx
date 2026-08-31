import Image from 'next/image'
import { Section } from './Section'
import { Reveal } from './Reveal'

// Verbatim kortreferanser fra 01-KLIENT-PROFIL.md seksjon 7.
const attester = [
  {
    sitat:
      'Arild har bidratt til at våre produkter og tjenester har nådd nye markeder og bransjer.',
    navn: 'Eigil Evensen',
    tittel: 'General Manager, ProFocus Systems',
    bilde: '/img/attester/eigil.jpg',
  },
  {
    sitat: 'Arilds engasjement hos oss bidro til økt motivasjon og bedre resultater.',
    navn: 'Gunnar Brattli',
    tittel: 'Managing Director, Cibes Lift Norge',
    bilde: '/img/attester/gunnar.jpg',
  },
  {
    sitat:
      'Arild har forbedret kvaliteten på våre salg, og jeg ser en stor økning i omsetningstallene.',
    navn: 'Even Hallås',
    tittel: 'Daglig leder',
    bilde: '/img/attester/even.jpg',
  },
  {
    sitat:
      'Arild skiller seg ut med en sterk personlighet og bred erfaring. Han er en å stole på i bransjen.',
    navn: 'Bjørn Alsterberg',
    tittel: 'CEO og hodejeger',
    bilde: '/img/attester/bjorn.jpg',
  },
]

function Stjerner() {
  return (
    <div aria-label="5 av 5 stjerner" className="mb-3 flex gap-0.5 text-dm-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  )
}

export function SocialProof() {
  return (
    <Section variant="subtle">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {attester.map((a, i) => (
          <Reveal key={a.navn} delay={i * 90} className="h-full">
            <figure className="dm-card flex h-full flex-col rounded-dm bg-white p-6 shadow-dm">
            <Stjerner />
            <blockquote className="flex-1 text-dm-text">
              &laquo;{a.sitat}&raquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Image
                src={a.bilde}
                alt={a.navn}
                width={48}
                height={48}
                sizes="48px"
                className="h-12 w-12 rounded-full object-cover"
              />
              <span>
                <span className="block font-semibold text-dm-heading">{a.navn}</span>
                <span className="block text-sm text-dm-primaryLight">{a.tittel}</span>
              </span>
            </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
