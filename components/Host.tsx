import Image from 'next/image'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { DRMULIG } from '@/lib/config'

// Møt verten. Portrett til venstre, tekst til høyre. Førsteperson, i Arilds stemme.
export function Host() {
  return (
    <Section variant="white" id="vert">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,460px)_1fr] md:gap-14">
        <Reveal className="group overflow-hidden rounded-dm shadow-dm">
          <Image
            src="/img/arild-2026.jpg"
            alt="Arild Pedersen, vert for DrMulig SpeedMeeting"
            width={757}
            height={765}
            sizes="(max-width: 768px) 100vw, 460px"
            className="w-full origin-center scale-[1.005] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="dm-eyebrow mb-3 text-dm-primaryLight">Møt verten</p>
          <h2>Hei! Jeg er Arild Pedersen</h2>
          <p className="mt-4 text-lg text-dm-text">
            Jeg har jobbet med B2B-salg i over 30 år, og nettverking er ett av de ti
            verktøyene jeg lærer bort. SpeedMeeting er måten jeg helst gjør det på: ekte
            folk i samme rom, korte pitcher og samtaler som faktisk fører et sted.
          </p>
          <blockquote className="mt-5 border-l-4 border-dm-accent pl-4 font-heading text-xl italic text-dm-heading">
            &laquo;Folk kjøper ikke fordi du snakker høyt, men fordi du stiller riktige
            spørsmål.&raquo;
          </blockquote>
          <p className="mt-5 text-dm-text">
            Vi sees på neste treff. Ta med et godt spørsmål og en kopp kaffe.
          </p>
          <a
            className="dm-btn-outline mt-6"
            href={DRMULIG.nettsted}
            target="_blank"
            rel="noopener noreferrer"
          >
            Les mer om DrMulig
          </a>
        </Reveal>
      </div>
    </Section>
  )
}
