import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import CTAGroup from '../ui/CTAGroup'
import { business } from '../../data/business'

export default function ContactCTA() {
  return (
    <section className="relative bg-ink py-28 md:py-36">
      <div className="container-premium text-center">
        <Reveal className="mx-auto max-w-2xl">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold-light" />
            Kontakt
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl font-medium leading-[1.1] text-cream md:text-4xl lg:text-5xl">
            Bringen Sie vorbei, was Ihnen wichtig ist.
          </h2>
          <p className="mt-5 text-balance leading-relaxed text-cream/70 md:text-lg">
            {business.street}, {business.zip} {business.city} — rufen Sie an, schreiben Sie
            uns per WhatsApp oder besuchen Sie uns direkt.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-9 flex justify-center">
          <CTAGroup />
        </Reveal>

        <Reveal delay={0.25} className="mt-6">
          <Link
            to="/kontakt"
            className="text-sm font-medium text-cream/60 underline-offset-4 hover:text-gold-light hover:underline"
          >
            Zur vollständigen Kontaktseite mit Karte & Formular →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
