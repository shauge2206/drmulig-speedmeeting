'use client'

import { useState } from 'react'

// Én FAQ-rad med myk utvidelse. I stedet for native <details> (som spretter opp)
// animerer vi høyden med grid-template-rows 0fr -> 1fr, som gir en jevn glidning.
export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="py-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-heading text-dm-h5 font-bold text-dm-heading"
      >
        {q}
        <span
          className={`flex-none text-dm-primaryLight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'rotate-[135deg]' : ''
          }`}
          aria-hidden
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Selve glidningen: raden går fra 0fr til 1fr, innholdet klippes til den er åpen */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-dm-text">{a}</p>
        </div>
      </div>
    </div>
  )
}
