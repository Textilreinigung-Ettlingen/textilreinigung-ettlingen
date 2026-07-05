import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/layout/PageHero'
import Bridal from '../components/sections/Bridal'
import Process from '../components/sections/Process'
import FAQ from '../components/sections/FAQ'

export default function Brautkleid() {
  useDocumentMeta(
    'Brautkleidreinigung Ettlingen | Textilreinigung Ettlingen',
    'Brautkleid Reinigung in Ettlingen: vollständige Handreinigung und museale Aufbewahrung für Spitze, Perlen und feinste Stickereien. Ab 195,00 €.',
    '/brautkleid'
  )

  return (
    <>
      <PageHero
        eyebrow="Brautkleidreinigung"
        title="Für das Kleid, das mehr verdient als eine Reinigung."
        subtitle="Vom ersten Tanz bis zur musealen Aufbewahrung — wir begleiten Ihr Brautkleid mit der Sorgfalt, die ein einmaliges Stück verdient."
        image="/images/premium-finish.webp"
        imagePosition="center 35%"
      />
      <Bridal />
      <Process />
      <FAQ
        ids={['brautkleid-hand', 'brautkleid-dauer', 'material-besonderheiten']}
        eyebrow="Fragen zum Brautkleid"
        title="Was Bräute uns am häufigsten fragen."
      />
    </>
  )
}
