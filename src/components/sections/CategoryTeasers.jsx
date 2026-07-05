import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const categories = [
  {
    title: 'Brautkleidreinigung',
    description: 'Handreinigung und museale Aufbewahrung für das Kleid Ihres Lebens.',
    to: '/brautkleid',
    span: 'lg:col-span-7 lg:row-span-2',
    image: '/images/brautkleid.webp',
    fit: 'contain',
    alt: 'Handgereinigtes Brautkleid — Textilreinigung Ettlingen',
  },
  {
    title: 'Hemdenservice',
    description: 'Abo-Karten für perfekt gepflegte Hemden im Alltag.',
    to: '/hemdenservice',
    span: 'lg:col-span-5',
    image: '/images/hemdenservice.webp',
    fit: 'cover',
    alt: 'Frisch gebügelte Hemden auf Bügeln — Hemdenservice Textilreinigung Ettlingen',
  },
  {
    title: 'Firmenkunden',
    description: 'Verlässliche Textilpflege im Rhythmus Ihres Betriebs.',
    to: '/firmenkunden',
    span: 'lg:col-span-5',
    image: '/images/firmenkunden.webp',
    fit: 'cover',
    alt: 'Gerollte Handtücher für Hotellerie und Gastronomie — Firmenkunden Textilreinigung Ettlingen',
  },
]

export default function CategoryTeasers() {
  return (
    <section className="relative bg-ink py-28 text-cream md:py-36">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Im Detail"
          title="Für jede Kategorie der richtige Anspruch."
          subtitle="Drei Bereiche, die eigene Sorgfalt verdienen — jeder mit eigener Seite, eigenem Ablauf und eigenem Preisrahmen."
          light
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {categories.map((cat, i) => (
            <Reveal key={cat.to} delay={i * 0.1} className={cat.span}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-cream/10 bg-black">
                <Link to={cat.to} className="relative block h-full min-h-[280px]">
                  <div className="absolute inset-0">
                    {cat.fit === 'contain' ? (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(214,185,117,0.3)_0%,transparent_55%)]" />
                        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                          <img
                            src={cat.image}
                            alt={cat.alt}
                            loading="lazy"
                            className="h-[105%] w-auto max-w-none object-contain object-bottom transition-transform duration-700 ease-premium group-hover:scale-105"
                          />
                        </div>
                      </>
                    ) : (
                      <img
                        src={cat.image}
                        alt={cat.alt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

                  <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-8">
                    <h3 className="font-display text-2xl font-medium text-cream md:text-3xl">
                      {cat.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/70">
                      {cat.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-light">
                      Entdecken
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/leistungen"
            className="flex-1 rounded-2xl border border-cream/10 px-6 py-5 text-sm font-medium text-cream/80 transition-colors hover:border-gold/40 hover:text-gold-light"
          >
            Alle Leistungen im Überblick →
          </Link>
          <Link
            to="/preise"
            className="flex-1 rounded-2xl border border-cream/10 px-6 py-5 text-sm font-medium text-cream/80 transition-colors hover:border-gold/40 hover:text-gold-light"
          >
            Preisliste ansehen →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
