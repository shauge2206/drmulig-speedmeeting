import Image from 'next/image'
import { Section, SectionHeading } from './Section'
import { Reveal } from './Reveal'

const steg = [
  {
    n: 1,
    tittel: 'Du møter opp',
    tekst: 'Kl. 08.00 i Lars Hilles gate 30. Kaffe i hånden, og du får lista over hvem du skal møte.',
  },
  {
    n: 2,
    tittel: 'Du møter én bedrift av gangen',
    tekst: 'Ansikt til ansikt, ikke foran en hel sal. Rolig nok til at dere faktisk får snakket sammen.',
  },
  {
    n: 3,
    tittel: 'Dere pitcher 2,5 minutter hver',
    tekst: 'Du forteller kort om deg og bedriften din, de gjør det samme, så bytter dere til neste på lista.',
  },
  {
    n: 4,
    tittel: 'Du har møtt opptil 29 bedrifter',
    tekst: 'På to timer. Deltakerlisten kommer i etterkant, så du kan følge opp de mest relevante.',
  },
]

export function HowItWorks() {
  return (
    <Section variant="white" id="slik-fungerer">
      <SectionHeading
        eyebrow="Slik fungerer et treff"
        title="Speed-dating, bedrift til bedrift"
        intro="Ingen løs mingling. Du møter bedriftene én for én, på rekke, og rekker over hele rommet på to timer."
      />

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <ol className="space-y-6">
          {steg.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 90} className="group flex gap-4">
              <span
                className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-dm-primary font-heading text-lg font-bold text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-dm-accent group-hover:text-dm-primary"
                aria-hidden
              >
                {s.n}
              </span>
              <div>
                <h3 className="text-dm-h4 text-dm-heading">{s.tittel}</h3>
                <p className="mt-1 text-dm-text">{s.tekst}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="group order-first overflow-hidden rounded-dm shadow-dm lg:order-last">
          <Image
            src="/img/slik-fungerer.jpg"
            alt="Arild Pedersen leder et SpeedMeeting med deltakere rundt bordet"
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
