import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { premiumServices } from '../../data/services'

export default function PremiumServices() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-cream md:py-36">
      <div className="container-premium grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Premium Services"
            title="Der letzte Schliff, der den Unterschied macht."
            subtitle="Veredelung ist kein Zusatz — sie ist Teil unseres Handwerksverständnisses. Diese Services heben Ihre Textilien über das Gewöhnliche hinaus."
            light
          />
          <Reveal delay={0.2}>
            <Link to="/kontakt" className="btn-gold mt-10 inline-flex">
              Beratung anfragen
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {premiumServices.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="aspect-[4/3]">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-cream/10 bg-black">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-6">
                    <h3 className="font-display text-xl font-medium text-cream">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">{item.description}</p>
                    <p className="mt-4 text-sm font-medium uppercase tracking-wider2 text-gold-light">
                      {item.price}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
