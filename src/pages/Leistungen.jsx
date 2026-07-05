import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/layout/PageHero'
import Services from '../components/sections/Services'
import QualityPromise from '../components/sections/QualityPromise'
import FAQ from '../components/sections/FAQ'

export default function Leistungen() {
  useDocumentMeta(
    'Leistungen | Textilreinigung Ettlingen',
    'Textilreinigung, Wäscherei, Teppichreinigung, Versicherungsschadensabwicklung und Premium-Extras — alle Leistungen der Textilreinigung Ettlingen im Überblick.',
    '/leistungen'
  )

  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Jedes Material verdient die richtige Behandlung."
        subtitle="Ein vollständiges Leistungsspektrum für Business-Garderobe, Haushaltstextilien und alles dazwischen — in Handarbeit, materialgerecht, in Ettlingen."
        image="/images/leistungen.webp"
      />
      <Services />
      <QualityPromise />
      <FAQ />
    </>
  )
}
