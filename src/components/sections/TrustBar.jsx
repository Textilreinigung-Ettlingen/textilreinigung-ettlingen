import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import { trustPoints } from '../../data/services'

export default function TrustBar() {
  return (
    <section id="vertrauen" className="relative border-b border-cream/10 bg-ink-800 py-16 md:py-20">
      <div className="container-premium grid gap-10 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {trustPoints.map((point, i) => (
          <Reveal key={point.title} delay={i * 0.1} className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-ink">
              <Icon name={point.icon} className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-medium text-cream">{point.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/65">{point.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
