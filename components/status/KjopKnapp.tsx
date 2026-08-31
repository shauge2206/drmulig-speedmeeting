'use client'

import { EVENT, NESTE_TREFF } from '@/lib/config'
import { useStatus } from './StatusProvider'

// KJØP PLASS-knappen. Peker rett på Stripe Payment Link.
// Bytter til deaktivert "Fulltegnet" kun hvis /api/status sier utsolgt.
// Uten JavaScript, eller hvis kallet feiler, forblir den en aktiv kjøpsknapp,
// og den som klikker møter Stripes egen utsolgt-melding. Ingen kan likevel betale.
export function KjopKnapp({
  label = 'Kjøp plass',
  className = '',
}: {
  label?: string
  className?: string
}) {
  const { utsolgt, lastet } = useStatus()

  if (lastet && utsolgt) {
    const neste = NESTE_TREFF[0]
    return (
      <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
        <span className="dm-btn" aria-disabled="true">
          Fulltegnet
        </span>
        {neste && (
          <span className="text-sm opacity-90">
            Neste treff er {neste.dato}. Skriv til{' '}
            <a className="underline" href="mailto:kontakt@drmulig.no">
              kontakt@drmulig.no
            </a>{' '}
            for beskjed når påmeldingen åpner.
          </span>
        )}
      </span>
    )
  }

  return (
    <a
      className={`dm-btn ${className}`}
      href={EVENT.stripe_payment_link_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  )
}
