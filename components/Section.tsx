import { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Variant = 'white' | 'subtle' | 'dark' | 'primaryLight'

const bg: Record<Variant, string> = {
  white: 'bg-white text-dm-text',
  subtle: 'bg-dm-subtle text-dm-text',
  dark: 'bg-dm-primary text-white',
  primaryLight: 'bg-dm-primaryLight text-white',
}

// Seksjonsramme. Holder container-bredde (maks 1200px) og vertikal rytme.
// variant styrer bakgrunn i mønsteret lys grå -> hvit -> mørk petrol.
export function Section({
  children,
  variant = 'white',
  id,
  className = '',
}: {
  children: ReactNode
  variant?: Variant
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={`${bg[variant]} py-14 md:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-dm px-5 md:px-8">{children}</div>
    </section>
  )
}

// Sentrert seksjonsoverskrift med valgfri eyebrow og ingress.
export function SectionHeading({
  eyebrow,
  title,
  intro,
  invert = false,
}: {
  eyebrow?: string
  title: string
  intro?: string
  invert?: boolean
}) {
  return (
    <Reveal className="mx-auto max-w-dm-narrow text-center">
      {eyebrow && (
        <p
          className={`dm-eyebrow mb-3 ${invert ? 'text-dm-accent' : 'text-dm-primaryLight'}`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={invert ? 'text-white' : ''}>{title}</h2>
      {intro && (
        <p className={`mt-4 text-lg ${invert ? 'text-white/85' : 'text-dm-text'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
