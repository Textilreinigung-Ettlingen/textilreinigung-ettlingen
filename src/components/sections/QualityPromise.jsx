import { ShieldCheck } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { qualityPromises } from '../../data/process'

export default function QualityPromise() {
  return (
    <section className="relative bg-ink py-28 text-cream md:py-36">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Qualitätsversprechen"
          title="Unser Wort auf jedes Stück, das uns anvertraut wird."
          align="center"
          className="mx-auto"
          light
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {qualityPromises.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-8 text-center"
            >
              <ShieldCheck className="mx-auto h-7 w-7 text-gold-light" strokeWidth={1.4} />
              <h3 className="mt-5 font-display text-lg font-medium text-cream">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-cream/65">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
