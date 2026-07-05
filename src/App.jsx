import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import StickyMobileCTA from './components/layout/StickyMobileCTA'
import ScrollToTop from './components/layout/ScrollToTop'
import { useSmoothScroll } from './hooks/useSmoothScroll'

import Home from './pages/Home'
import Leistungen from './pages/Leistungen'
import Preise from './pages/Preise'
import Brautkleid from './pages/Brautkleid'
import Hemdenservice from './pages/Hemdenservice'
import Firmenkunden from './pages/Firmenkunden'
import Kontakt from './pages/Kontakt'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
      >
        Zum Inhalt springen
      </a>
      <Header />
      <main id="main" className="pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen" element={<Leistungen />} />
          <Route path="/preise" element={<Preise />} />
          <Route path="/brautkleid" element={<Brautkleid />} />
          <Route path="/hemdenservice" element={<Hemdenservice />} />
          <Route path="/firmenkunden" element={<Firmenkunden />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  )
}
