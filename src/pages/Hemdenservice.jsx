import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/layout/PageHero'
import ShirtService from '../components/sections/ShirtService'
import Process from '../components/sections/Process'

export default function Hemdenservice() {
  useDocumentMeta(
    'Hemdenservice Ettlingen | Textilreinigung Ettlingen',
    'Hemdenservice in Ettlingen mit Abo-Karten: Hemden auf Bügel oder gelegt, ab 4,25 € pro Hemd. Textilreinigung Ettlingen, Durlacher Str. 23.',
    '/hemdenservice'
  )

  return (
    <>
      <PageHero
        eyebrow="Hemdenservice"
        title="Ein makelloses Hemd ist kein Zufall — es ist ein Abo."
        subtitle="Ob einzeln oder im Paket: Ihre Hemden sind bei uns in besten Händen, auf Bügel oder gelegt, ganz nach Ihrem Alltag."
        image="/images/hemdenservice.webp"
      />
      <ShirtService />
      <Process />
    </>
  )
}
