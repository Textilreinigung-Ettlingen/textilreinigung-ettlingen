import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { processSteps } from '../../data/process'

export default function Process() {
  return (
    <section id="ablauf" className="relative bg-ink py-28 text-cream md:py-36">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Ablauf"
          title="Sechs Schritte zwischen Abgabe und perfektem Ergebnis."
          light
        />

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-cream/10 lg:block" />
          <div className="grid gap-10 lg:grid-cols-6 lg:gap-6">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08} className="relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ink font-display text-sm text-gold-light">
                  {step.step}
                </div>
                <h3 className="mt-5 font-display text-lg font-medium text-cream">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
