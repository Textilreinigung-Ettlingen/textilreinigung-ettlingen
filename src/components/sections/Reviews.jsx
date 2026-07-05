import { Star, ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { googleReviewUrl, brandQuotes } from '../../data/reviews'

export default function Reviews() {
  return (
    <section className="relative bg-ink-800 py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Vertrauen"
          title="Was uns antreibt — und wo Sie es nachlesen können."
          subtitle="Statt Zitate zu erfinden, sagen wir Ihnen lieber, wofür wir stehen. Was andere über uns sagen, lesen Sie ungefiltert bei Google."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {brandQuotes.map((item, i) => (
            <Reveal
              key={item.quote}
              delay={i * 0.1}
              className="rounded-2xl border border-cream/10 bg-ink-700 p-8"
            >
              <span className="font-display text-4xl leading-none text-gold-light">&ldquo;</span>
              <p className="mt-2 font-display text-xl italic leading-snug text-cream">
                {item.quote}
              </p>
              <p className="mt-5 text-xs uppercase tracking-wider2 text-cream/50">
                {item.context}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <a href={googleReviewUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <Star className="h-4 w-4" strokeWidth={2} />
            Echte Google Bewertungen ansehen
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
