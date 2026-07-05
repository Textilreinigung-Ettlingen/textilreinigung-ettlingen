import { Leaf } from 'lucide-react'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import CTAGroup from '../components/ui/CTAGroup'
import { pricingCategories } from '../data/pricing'
import { scrollToHash } from '../hooks/useSmoothScroll'

export default function Preise() {
  useDocumentMeta(
    'Preise | Textilreinigung Ettlingen',
    'Transparente Preise für Textilreinigung, Wäscherei, Brautkleidreinigung, Hemdenservice und Heimtextilien — Textilreinigung Ettlingen, Durlacher Str. 23.',
    '/preise'
  )

  return (
    <>
      <PageHero
        eyebrow="Preise"
        title="Transparente Preise, ohne Überraschungen."
        subtitle="Alle Richtwerte auf einen Blick — von Hemd und Anzug bis Bettwäsche und Brautkleid. Individuelle Beratung erhalten Sie bei Abgabe oder telefonisch."
        image="/images/preise.webp"
        imagePosition="center 25%"
      />

      <section className="relative bg-ink pb-6 pt-14 md:pt-20">
        <div className="container-premium">
          <Reveal className="rounded-2xl border border-gold/25 bg-gradient-to-b from-ink-600 to-ink-800 p-8 text-center md:p-10">
            <Leaf className="mx-auto h-7 w-7 text-gold-light" strokeWidth={1.4} />
            <h2 className="mt-4 font-display text-xl font-medium text-cream md:text-2xl">
              Bewusst plastikfrei — für ein sauberes Ettlingen.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-cream/70">
              Uns liegt der Schutz unserer Umwelt und unserer Heimatstadt Ettlingen sehr am
              Herzen. Deshalb verzichten wir bewusst auf Einweg-Plastikfolie. Stattdessen
              erhalten Sie Ihre gereinigten Textilien auf Wunsch in einem wiederverwendbaren
              Kleidersack, den Sie einfach zur nächsten Abgabe und Abholung wieder mitbringen
              können.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="sticky top-20 z-30 border-b border-cream/10 bg-ink/95 backdrop-blur-md md:top-24">
        <div className="container-premium">
          <nav className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {pricingCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToHash(`#${cat.id}`, -150)}
                className="shrink-0 whitespace-nowrap rounded-full border border-cream/15 px-4 py-2 text-xs font-medium text-cream/75 transition-colors hover:border-gold-light hover:text-gold-light"
              >
                {cat.category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <section className="relative bg-ink py-20 md:py-28">
        <div className="container-premium space-y-16">
          {pricingCategories.map((cat, i) => (
            <Reveal
              key={cat.id}
              id={cat.id}
              delay={(i % 3) * 0.06}
              className="scroll-mt-40 rounded-2xl border border-cream/10 bg-ink-800 p-7 md:p-9"
            >
              <h2 className="font-display text-xl font-medium text-cream md:text-2xl">
                {cat.category}
              </h2>
              {cat.note && (
                <p className="mt-2 text-sm italic text-cream/50">{cat.note}</p>
              )}
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 rounded-lg border border-gold/20 bg-cream/[0.04] px-3 py-2.5 text-sm"
                  >
                    <span className="text-cream/75">{item.name}</span>
                    <span className="shrink-0 font-medium text-cream">{item.price}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={0.15} className="rounded-2xl border border-cream/10 bg-ink-700 p-8 text-center md:p-10">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-cream/70">
              Alle Preise verstehen sich als Richtwerte inkl. gesetzlicher MwSt. Ausgefallene
              Materialien, starke Verschmutzungen oder Sonderwünsche können den Preis
              individuell verändern — eine verbindliche Auskunft erhalten Sie immer direkt bei
              Abgabe oder telefonisch.
            </p>
            <div className="mt-7 flex justify-center">
              <CTAGroup />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
