import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/layout/PageHero'
import Contact from '../components/sections/Contact'

export default function Kontakt() {
  useDocumentMeta(
    'Kontakt | Textilreinigung Ettlingen',
    'Textilreinigung Ettlingen, Durlacher Str. 23, 76275 Ettlingen. Telefon 07243 3644717 — jetzt anrufen, per WhatsApp schreiben oder Route planen.',
    '/kontakt'
  )

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Wir freuen uns auf Sie."
        subtitle="Rufen Sie an, schreiben Sie uns per WhatsApp oder besuchen Sie uns direkt in der Durlacher Str. 23 in Ettlingen."
        image="/images/handgebuegelt.webp"
        imagePosition="center 30%"
      />
      <Contact />
    </>
  )
}
