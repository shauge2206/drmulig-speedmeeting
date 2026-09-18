import { StatusProvider } from '@/components/status/StatusProvider'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { Numbers } from '@/components/Numbers'
import { SocialProof } from '@/components/SocialProof'
import { Gallery } from '@/components/Gallery'
import { WhatYouGet } from '@/components/WhatYouGet'
import { ForYou } from '@/components/ForYou'
import { Host } from '@/components/Host'
import { LogoStrip } from '@/components/LogoStrip'
import { Pricing } from '@/components/Pricing'
import { Faq } from '@/components/Faq'
import { FinalCta } from '@/components/FinalCta'
import { Footer } from '@/components/Footer'

export default function Home() {
  // StatusProvider gjoer plass-telleren tilgjengelig for alle KJOEP PLASS-knappene.
  // Seksjonsrekkefolgen folger referansedesignet: hero -> slik fungerer -> tall ->
  // referanser -> bilder -> dette faar du -> hvem passer det for -> vert -> logoer
  // -> pris -> faq -> siste CTA. Bakgrunnene veksler for tydelig rytme.
  return (
    <StatusProvider>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Numbers />
        <SocialProof />
        <Gallery />
        <WhatYouGet />
        <ForYou />
        <Host />
        <LogoStrip />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </StatusProvider>
  )
}
