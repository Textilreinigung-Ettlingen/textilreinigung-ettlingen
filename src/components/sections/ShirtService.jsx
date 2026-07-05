import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import CTAGroup from '../ui/CTAGroup'

const plans = [
  {
    name: 'Einzelstück',
    detail: 'Ideal für den gelegentlichen Bedarf — ohne Bindung.',
    options: [
      { unit: 'Auf Bügel', price: '5,90 €' },
      { unit: 'Gelegt', price: '6,90 €' },
    ],
  },
  {
    name: '20er-Karte',
    detail: '98,00 € auf Bügel bzw. 118,00 € gelegt im Paket.',
    featured: true,
    options: [
      { unit: 'Auf Bügel', price: '4,90 €' },
      { unit: 'Gelegt', price: '5,90 €' },
    ],
  },
  {
    name: '40er-Karte',
    detail: '170,00 € auf Bügel bzw. 210,00 € gelegt im Paket.',
    options: [
      { unit: 'Auf Bügel', price: '4,25 €' },
      { unit: 'Gelegt', price: '5,25 €' },
    ],
  },
]

export default function ShirtService() {
  return (
    <section id="hemden" className="relative bg-ink-800 py-28 md:py-36">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Hemdenservice"
          title="Perfekt gepflegte Hemden, ohne darüber nachdenken zu müssen."
          subtitle="Mit unseren Abo-Karten sparen Sie pro Hemd und holen ab, wann es in Ihren Alltag passt — auf Bügel oder gelegt, ganz nach Wunsch."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 0.1}
              className={`relative rounded-2xl border p-8 text-cream transition-all duration-500 ${
                plan.featured
                  ? 'border-gold/50 bg-gradient-to-b from-ink-600 to-ink shadow-premium md:-translate-y-3'
                  : 'border-cream/10 bg-ink-700'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold-gradient px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider2 text-ink">
                  Beliebteste Wahl
                </span>
              )}
              <h3 className="font-display text-xl font-medium text-cream">{plan.name}</h3>
              <div className="mt-6 divide-y divide-cream/10">
                {plan.options.map((opt) => (
                  <div key={opt.unit} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <span className="text-xs uppercase tracking-wider2 text-cream/50">{opt.unit}</span>
                    <p className="font-display text-2xl font-medium text-gold-light">
                      {opt.price}
                      <span className="ml-1 text-xs font-sans font-normal opacity-60">/ Hemd</span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-cream/65">{plan.detail}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-14 flex justify-center">
          <CTAGroup />
        </Reveal>
      </div>
    </section>
  )
}
