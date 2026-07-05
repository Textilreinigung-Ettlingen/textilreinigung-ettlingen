import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import NoiseOverlay from '../ui/NoiseOverlay'
import CTAGroup from '../ui/CTAGroup'
import logoFull from '../../assets/logo-full-web.png'

const FabricScene = lazy(() => import('../three/FabricScene'))

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      <Suspense
        fallback={
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#3C3F46_0%,#15161A_70%)]"
            aria-hidden="true"
          />
        }
      >
        <FabricScene />
      </Suspense>
      <NoiseOverlay opacity={0.05} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />

      <div className="container-premium relative z-10 pb-24 pt-32 md:pb-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 1, ease },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          }}
          className="relative mx-auto mb-8 flex justify-center"
        >
          <img
            src={logoFull}
            alt="Textilreinigung Ettlingen"
            className="h-28 w-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)] sm:h-36 md:h-44 lg:h-48"
          />
          <motion.div
            aria-hidden="true"
            initial={{ backgroundPosition: '-60% -60%' }}
            animate={{ backgroundPosition: ['-60% -60%', '160% 160%', '160% 160%'] }}
            transition={{ duration: 6, times: [0, 0.08, 1], repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.9) 50%, transparent 58%)',
              backgroundSize: '300% 300%',
              WebkitMaskImage: `url(${logoFull})`,
              maskImage: `url(${logoFull})`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.25 }}
          className="mt-7 max-w-4xl text-balance font-display text-4xl font-medium leading-[1.08] text-cream sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Meisterhaftes Handwerk für Textilien, die etwas bedeuten.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
          className="mt-7 max-w-xl text-balance text-base leading-relaxed text-cream/70 md:text-lg"
        >
          Von Anzügen über Brautkleider bis zur Firmenwäsche — wir behandeln jedes
          Stück wie ein Unikat. In Handarbeit, materialgerecht, seit Generationen
          in Karlsruhe, jetzt auch in Ettlingen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.65 }}
          className="mt-10"
        >
          <CTAGroup />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: [0, -60, 0] }}
        transition={{ duration: 1, delay: 1, opacity: { duration: 1 }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
        className="pointer-events-none absolute right-8 top-40 hidden rounded-2xl border border-cream/15 bg-cream/5 px-5 py-4 backdrop-blur-md md:block"
      >
        <p className="text-2xl font-display font-medium text-cream">100%</p>
        <p className="text-xs uppercase tracking-wider2 text-cream/60">Handarbeit</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 md:bottom-14"
      >
        <motion.a
          href="#vertrauen"
          onClick={(e) => {
            e.preventDefault()
            window.__lenis?.scrollTo('#vertrauen', { offset: -84 })
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-cream/50"
          aria-label="Weiter scrollen"
        >
          <span className="text-[0.65rem] uppercase tracking-wider2">Entdecken</span>
          <ChevronDown className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  )
}
