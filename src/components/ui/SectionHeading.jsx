import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = true,
  className = '',
}) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <Reveal direction="fade">
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold-light" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={`mt-4 text-balance font-display text-3xl font-medium leading-[1.1] md:text-4xl lg:text-5xl ${
            light ? 'text-cream' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-balance text-base leading-relaxed md:text-lg ${
              light ? 'text-cream/70' : 'text-ink-700/80'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
