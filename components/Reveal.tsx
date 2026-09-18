'use client'

import { useEffect, useRef, useState, ReactNode, ElementType } from 'react'

// Scroll-avsloering. Innholdet tones inn og glir opp hver gang det kommer inn i
// viewporten, uansett om du scroller ned eller opp. Naar elementet forlater
// viewporten nullstilles det, slik at det toner inn paa nytt neste gang.
// Respekterer prefers-reduced-motion: da vises alt med en gang, uten bevegelse.
// Ingen tunge bibliotek, kun IntersectionObserver.
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [synlig, setSynlig] = useState(false)
  const [redusert, setRedusert] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRedusert(true)
      setSynlig(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        // Toggler begge veier: inn i viewport -> synlig, ut -> nullstill.
        entries.forEach((e) => setSynlig(e.isIntersecting))
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`dm-reveal ${synlig ? 'dm-reveal-in' : ''} ${className}`}
      // Forsinkelsen (stagger) gjelder kun ved inntoning, ikke ved utfading,
      // slik at elementer ikke henger igjen naar de forlater viewporten.
      style={delay && synlig && !redusert ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
