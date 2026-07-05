import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Logo from '../ui/Logo'
import { navLinks } from '../../data/nav'
import { business, telHref, mailHref } from '../../data/business'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="kontakt-footer" className="relative overflow-hidden bg-ink text-cream">
      <div className="container-premium grid gap-14 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
            Meisterhandwerk für Business-Garderobe, Brautkleider und feine Textilien —
            seit Generationen in Karlsruhe, jetzt auch in Ettlingen.
          </p>
        </div>

        <div className="md:col-span-2">
          <h3 className="eyebrow text-gold-light">Navigation</h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-cream/70 transition-colors hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="eyebrow text-gold-light">Kontakt</h3>
          <ul className="mt-5 space-y-4 text-sm text-cream/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" strokeWidth={1.5} />
              <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-gold-light">
                {business.street}, {business.zip} {business.city}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold-light" strokeWidth={1.5} />
              <a href={telHref} className="hover:text-gold-light">{business.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold-light" strokeWidth={1.5} />
              <a href={mailHref} className="hover:text-gold-light">{business.email}</a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="eyebrow text-gold-light">Öffnungszeiten</h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/70">
            {business.hours.map((h) => (
              <li key={h.days} className="flex items-start justify-between gap-4">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-gold-light" strokeWidth={1.5} />
                  {h.days}
                </span>
                <span className="text-right text-cream/50">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-premium flex flex-col items-center justify-between gap-4 py-8 text-xs text-cream/40 md:flex-row">
          <p>© {year} {business.name}. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-6">
            <a href="/impressum.html" className="hover:text-cream/70">Impressum</a>
            <a href="/datenschutz.html" className="hover:text-cream/70">Datenschutz</a>
            <a href="/agb.html" className="hover:text-cream/70">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
