// scripts/main.js — minimal, ARIA-friendly enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('js-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const themeBtn = document.getElementById('js-theme-toggle');
  if (themeBtn) {
    const root = document.documentElement;
    const apply = (mode) => {
      if (mode === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
      themeBtn.setAttribute('aria-pressed', mode === 'dark');
    };
    const saved = localStorage.getItem('site-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    apply(saved);
    themeBtn.addEventListener('click', () => {
      const next = root.classList.contains('dark') ? 'light' : 'dark';
      apply(next);
      localStorage.setItem('site-theme', next);
    });
  }

  // Reveal observer
  if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal--visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('reveal--visible'));
  }
});
