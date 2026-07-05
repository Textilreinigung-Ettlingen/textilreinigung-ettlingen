import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import CTAGroup from '../ui/CTAGroup'
import { business, mailHref } from '../../data/business'

export default function Contact() {
  const [form, setForm] = useState({ name: '', message: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Anfrage von ${form.name || 'Website'}`)
    const body = encodeURIComponent(form.message)
    window.location.href = `${mailHref}?subject=${subject}&body=${body}`
  }

  return (
    <section id="kontakt" className="relative bg-ink-800 py-28 md:py-36">
      <div className="container-premium grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Kontakt"
            title="Bringen Sie vorbei, was Ihnen wichtig ist."
            subtitle="Rufen Sie an, schreiben Sie uns per WhatsApp oder besuchen Sie uns direkt in Ettlingen."
          />

          <Reveal delay={0.15} className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-light" strokeWidth={1.5} />
              <div>
                <p className="font-medium text-cream">{business.street}</p>
                <p className="text-cream/65">{business.zip} {business.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 shrink-0 text-gold-light" strokeWidth={1.5} />
              <a href={`tel:${business.phone.replace(/\s+/g, '')}`} className="text-cream hover:text-gold-light">
                {business.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 shrink-0 text-gold-light" strokeWidth={1.5} />
              <a href={mailHref} className="text-cream hover:text-gold-light">{business.email}</a>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-gold-light" strokeWidth={1.5} />
              <div className="space-y-1">
                {business.hours.map((h) => (
                  <p key={h.days} className="text-cream/65">
                    <span className="text-cream">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="mt-9">
            <CTAGroup />
          </Reveal>

          <Reveal delay={0.3} className="mt-6 rounded-xl border border-cream/10 bg-ink-700 px-5 py-4 text-sm text-cream/70">
            Kein Termin nötig — kommen Sie während unserer Öffnungszeiten einfach vorbei.
            Nur für Lieferung und Abholung (z. B. Teppiche oder Firmenkunden) stimmen wir
            gerne einen Termin mit Ihnen ab.
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal direction="scale">
            <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-cream/10 bg-ink p-10 text-center shadow-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(214,185,117,0.16)_0%,transparent_60%)]" />
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient">
                <MapPin className="h-7 w-7 text-ink" strokeWidth={1.5} />
              </div>
              <p className="relative z-10 mt-6 font-display text-2xl font-medium text-cream">
                {business.street}
              </p>
              <p className="relative z-10 mt-1 text-cream/65">{business.zip} {business.city}</p>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold relative z-10 mt-8"
              >
                In Google Maps öffnen
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 rounded-2xl border border-cream/10 bg-ink-700 p-8">
            <h3 className="font-display text-xl font-medium text-cream">Kurze Nachricht senden</h3>
            <p className="mt-1.5 text-sm text-cream/60">
              Öffnet Ihr E-Mail-Programm mit vorausgefüllter Nachricht an uns.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                required
                placeholder="Ihr Name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-cream/15 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold-light focus:outline-none"
              />
              <textarea
                required
                rows={4}
                placeholder="Ihre Nachricht"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-none rounded-xl border border-cream/15 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold-light focus:outline-none"
              />
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <Send className="h-4 w-4" strokeWidth={2} />
                Nachricht senden
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
