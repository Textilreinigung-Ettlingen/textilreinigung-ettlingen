import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import CTAGroup from '../ui/CTAGroup'
import { corporateIndustries } from '../../data/process'

export default function Corporate() {
  return (
    <section id="firmenkunden" className="relative bg-ink-800 py-28 md:py-36">
      <div className="container-premium grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Firmenkunden"
            title="Verlässliche Textilpflege im Takt Ihres Betriebs."
            subtitle="Für Praxen, Hotellerie, Gastronomie und Einzelhandel übernehmen wir Berufskleidung und Wäsche im festen Rhythmus — diskret, pünktlich und in gleichbleibender Qualität."
          />
          <Reveal delay={0.2}>
            <div className="mt-10">
              <CTAGroup />
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {corporateIndustries.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="rounded-2xl border border-cream/10 bg-ink-700 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-soft"
            >
              <h3 className="font-display text-lg font-medium text-cream">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-cream/65">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
