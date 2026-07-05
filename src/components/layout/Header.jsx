import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import Logo from '../ui/Logo'
import { navLinks } from '../../data/nav'
import { business, telHref } from '../../data/business'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        scrolled ? 'bg-ink/90 shadow-soft backdrop-blur-md' : 'bg-transparent'
      }`}
    >
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
            className="fixed inset-0 top-20 z-40 bg-ink lg:hidden"
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
