import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })
    window.__lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}

export function scrollToHash(hash, offset = -84) {
  const el = document.querySelector(hash)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
