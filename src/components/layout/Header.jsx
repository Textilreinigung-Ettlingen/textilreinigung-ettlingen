import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, Clock } from 'lucide-react'
import Logo from '../ui/Logo'
import { navLinks } from '../../data/nav'
import { business, telHref, temporaryClosure, isTemporaryClosureActive } from '../../data/business'

const NOTICE_DISMISS_KEY = 'te-mittagspause-notice-dismissed'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [noticeDismissed, setNoticeDismissed] = useState(true)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    if (!isTemporaryClosureActive()) return
    try {
      setNoticeDismissed(sessionStorage.getItem(NOTICE_DISMISS_KEY) === '1')
    } catch {
      setNoticeDismissed(false)
    }
  }, [])

  function dismissNotice() {
    setNoticeDismissed(true)
    try {
      sessionStorage.setItem(NOTICE_DISMISS_KEY, '1')
    } catch {
      // sessionStorage kann in privaten Tabs blockiert sein — dann bleibt die Anzeige bis zum nächsten Laden sichtbar
    }
  }

  const showNotice = isTemporaryClosureActive() && !noticeDismissed

  useEffect(() => {
    function measure() {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [showNotice])

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        scrolled ? 'bg-ink/90 shadow-soft backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <AnimatePresence initial={false}>
        {showNotice && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden border-b border-ink/10 bg-gold-gradient text-ink shadow-[0_2px_16px_rgba(0,0,0,0.18)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_-20%,rgba(255,255,255,0.35),transparent_55%)]" />
            <div className="container-premium relative flex flex-col items-center gap-x-3 gap-y-1.5 py-3 pr-9 text-center sm:flex-row sm:justify-center sm:py-2.5">
              <span className="inline-flex items-center gap-2 whitespace-nowrap font-display text-[13px] font-semibold tracking-wide sm:text-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
                </span>
                <Clock className="h-4 w-4 shrink-0" strokeWidth={2} />
                {temporaryClosure.bannerHeadline}
              </span>

              <span className="hidden h-3.5 w-px shrink-0 bg-ink/25 sm:block" />

              <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <span className="rounded-full bg-ink/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide sm:text-xs">
                  {temporaryClosure.rangeLabel}
                </span>
                <span className="text-[11px] font-medium text-ink/90 sm:text-xs">
                  Mo – Fr {temporaryClosure.weekdayHoursShort}
                </span>
              </span>

              <button
                type="button"
                onClick={dismissNotice}
                aria-label="Hinweis schließen"
                className="absolute right-3 top-3 rounded-full p-1 text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink sm:right-4 sm:top-1/2 sm:-translate-y-1/2"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container-premium flex h-20 items-center justify-between md:h-24">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="relative z-10"
          aria-label="Textilreinigung Ettlingen — Startseite"
        >
          <Logo className={scrolled || menuOpen ? '' : 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide text-cream/85 transition-colors duration-300 hover:text-gold-light ${
                  isActive ? '!text-gold-light' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={telHref} className="inline-flex items-center gap-2 text-sm font-medium text-cream">
            <Phone className="h-4 w-4" strokeWidth={2} />
            {business.phoneDisplay}
          </a>
          <Link to="/kontakt" className="btn-gold !px-6 !py-3 text-xs">
            Kontakt aufnehmen
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ top: headerHeight || undefined }}
            className="fixed inset-x-0 bottom-0 top-20 z-40 bg-ink lg:hidden"
          >
            <div className="container-premium flex h-full flex-col justify-between py-10">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-cream/10 py-4 font-display text-3xl font-medium text-cream"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="flex flex-col gap-4">
                <a href={telHref} className="btn-primary w-full">
                  <Phone className="h-4 w-4" /> {business.phoneDisplay}
                </a>
                <p className="text-center text-sm text-cream/50">
                  {business.street}, {business.zip} {business.city}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
