import Reveal from '../ui/Reveal'
import NoiseOverlay from '../ui/NoiseOverlay'
import CTAGroup from '../ui/CTAGroup'

const facts = [
  { label: 'Reinigung', value: 'Vollständig in Handarbeit' },
  { label: 'Aufbewahrung', value: 'Säurefrei & lichtgeschützt' },
  { label: 'Ab Preis', value: '195,00 €' },
]

export default function Bridal() {
  return (
    <section className="relative overflow-hidden bg-ink-800 py-28 md:py-36">
      <div className="container-premium grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal
          direction="scale"
          className="order-1 aspect-[4/5] w-full lg:order-2 lg:col-span-5"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black shadow-premium">
            <NoiseOverlay opacity={0.05} />
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
              <img
                src="/images/brautkleid.webp"
                alt="Handgereinigtes Brautkleid auf Schneiderpuppe — Textilreinigung Ettlingen"
                className="h-[92%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <div className="order-2 lg:order-1 lg:col-span-7">
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold-light" />
            Brautkleidreinigung
          </span>
          <Reveal delay={0.1}>
            <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-medium leading-[1.12] text-cream md:text-4xl lg:text-5xl">
              Ein Kleid, das nur einen Tag getragen wird — und ein Leben lang bleibt.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-balance leading-relaxed text-cream/70 md:text-lg">
              Spitze, Perlen, Seide und feinste Stickereien verzeihen keine Eile. Deshalb
              reinigen wir Brautkleider ausschließlich von Hand und bereiten sie anschließend
              fachgerecht für die langfristige, museale Aufbewahrung vor — bereit, wenn Sie es
              eines Tages wieder in den Händen halten möchten.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-6 border-y border-cream/10 py-8">
            {facts.map((fact, i) => (
              <Reveal key={fact.label} delay={0.1 + i * 0.08}>
                <p className="font-display text-lg font-medium text-cream md:text-xl">{fact.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider2 text-cream/50">{fact.label}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-10 rounded-2xl border border-gold/20 bg-cream/[0.04] p-6">
            <p className="text-sm font-medium text-gold-light">
              Optional: museale Aufbewahrungsbox
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream/70">
              Auf Wunsch bewahren wir Ihr Brautkleid in einer speziellen, mit Seidenpapier
              ausgelegten Aufbewahrungsbox auf. Der Preis richtet sich nach der Größe der Box
              und wird auf Anfrage ermittelt.
            </p>
          </Reveal>

          <Reveal delay={0.38} className="mt-8">
            <CTAGroup />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
