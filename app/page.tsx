import { StatusProvider } from '@/components/status/StatusProvider'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { SocialProof } from '@/components/SocialProof'
import { HowItWorks } from '@/components/HowItWorks'
import { WhatYouGet } from '@/components/WhatYouGet'
import { ForYou } from '@/components/ForYou'
import { Host } from '@/components/Host'
import { Pricing } from '@/components/Pricing'
import { Gallery } from '@/components/Gallery'
import { LogoStrip } from '@/components/LogoStrip'
import { Faq } from '@/components/Faq'
import { FinalCta } from '@/components/FinalCta'
import { Footer } from '@/components/Footer'

export default function Home() {
  // StatusProvider gjoer plass-telleren tilgjengelig for alle KJOEP PLASS-knappene.
  // Alt annet er server-rendret. Seksjonsrytme: hero (moerk) -> lys graa -> hvit ...
  return (
    <StatusProvider>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <WhatYouGet />
        <ForYou />
        <Host />
        <Pricing />
        <Gallery />
        <LogoStrip />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </StatusProvider>
  )
}
