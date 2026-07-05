import { motion } from 'framer-motion'
import NoiseOverlay from '../ui/NoiseOverlay'

const ease = [0.16, 1, 0.3, 1]

export default function PageHero({ eyebrow, title, subtitle, image, imagePosition = 'center' }) {
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-ink pb-20 pt-36 text-cream md:min-h-[480px] md:pb-24 md:pt-44">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
      )}
      <NoiseOverlay opacity={0.05} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />

      <div className="container-premium relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="eyebrow text-gold-light"
        >
          <span className="h-px w-8 bg-gold-light" />
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mt-6 max-w-2xl text-balance font-display text-4xl font-medium leading-[1.1] md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-cream/70 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
