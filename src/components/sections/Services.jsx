import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import IconTile from '../ui/IconTile'
import Reveal from '../ui/Reveal'
import { services } from '../../data/services'

export default function Services() {
  return (
    <section className="relative bg-ink-800 py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Leistungen"
          title="Ein Leistungsspektrum für jedes wertvolle Stück."
          subtitle="Von der täglichen Business-Garderobe bis zum Brautkleid: jede Reinigung beginnt mit der Frage, was das jeweilige Material wirklich braucht."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <IconTile key={service.id} index={i} {...service} />
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-5 border-t border-cream/10 pt-12 text-center sm:flex-row sm:justify-center">
          <Link to="/preise" className="btn-primary">
            Alle Preise ansehen
          </Link>
          <Link to="/kontakt" className="btn-secondary">
            Beratung anfragen
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
