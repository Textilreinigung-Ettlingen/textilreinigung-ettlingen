import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/layout/PageHero'
import Corporate from '../components/sections/Corporate'
import FAQ from '../components/sections/FAQ'

export default function Firmenkunden() {
  useDocumentMeta(
    'Firmenkunden | Textilreinigung Ettlingen',
    'Textilpflege für Praxen, Hotellerie, Gastronomie und Einzelhandel — feste Abhol- und Lieferrhythmen von Textilreinigung Ettlingen.',
    '/firmenkunden'
  )

  return (
    <>
      <PageHero
        eyebrow="Firmenkunden"
        title="Ihr Betrieb läuft im Takt — wir passen uns an."
        subtitle="Von der Arztpraxis bis zum Hotel: verlässliche Textilpflege im festen Rhythmus, diskret und in gleichbleibender Qualität."
        image="/images/firmenkunden.webp"
      />
      <Corporate />
      <FAQ
        ids={['firmenkunden-termine', 'material-besonderheiten']}
        eyebrow="Fragen von Firmenkunden"
        title="Was Sie vor der Zusammenarbeit wissen sollten."
      />
    </>
  )
}
