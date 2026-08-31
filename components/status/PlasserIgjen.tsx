'use client'

import { EVENT } from '@/lib/config'
import { useStatus } from './StatusProvider'

// Viser plasser igjen KUN når det er under ti. "23 plasser igjen" selger
// dårligere enn ingenting, "3 plasser igjen" selger godt. Se 05-LITE-VERSJON.md.
// Før statusen er lastet (eller hvis kallet feiler) vises den nøytrale
// standardteksten "30 plasser per treff".
export function PlasserIgjen({ className = '' }: { className?: string }) {
  const { igjen, utsolgt, lastet } = useStatus()

  let tekst = `${EVENT.capacity} plasser per treff`
  if (lastet && utsolgt) tekst = 'Fulltegnet for denne gang'
  else if (lastet && igjen > 0 && igjen <= 10)
    tekst = igjen === 1 ? 'Siste plass igjen' : `${igjen} plasser igjen`

  return <span className={className}>{tekst}</span>
}
