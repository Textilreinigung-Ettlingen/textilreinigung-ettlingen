import { useDocumentMeta } from '../hooks/useDocumentMeta'
import Hero from '../components/sections/Hero'
import TrustBar from '../components/sections/TrustBar'
import CategoryTeasers from '../components/sections/CategoryTeasers'
import PremiumServices from '../components/sections/PremiumServices'
import Process from '../components/sections/Process'
import QualityPromise from '../components/sections/QualityPromise'
import Reviews from '../components/sections/Reviews'
import FAQ from '../components/sections/FAQ'
import ContactCTA from '../components/sections/ContactCTA'

export default function Home() {
  useDocumentMeta(
    'Textilreinigung Ettlingen | Premium Reinigung für Mode, Braut & Business',
    'Textilreinigung Ettlingen – exzellente Handreinigung für Business-Kleidung, Brautkleider, Teppiche & Hemden. Meisterhandwerk seit Generationen, jetzt auch in Ettlingen.',
    '/'
  )

  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryTeasers />
      <PremiumServices />
      <Process />
      <QualityPromise />
      <Reviews />
      <FAQ />
      <ContactCTA />
    </>
  )
}
