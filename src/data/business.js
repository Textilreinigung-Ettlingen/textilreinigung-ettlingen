export const business = {
  name: 'Textilreinigung Ettlingen',
  legalName: 'Textilreinigung Ettlingen',
  street: 'Durlacher Str. 23',
  zip: '76275',
  city: 'Ettlingen',
  region: 'Baden-Württemberg',
  country: 'DE',
  phone: '+49 7243 3644717',
  phoneDisplay: '07243 3644717',
  whatsapp: '+49 160 4138492',
  whatsappDisplay: '0160 4138492',
  email: 'info@textilreinigung-ettlingen.de',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Durlacher+Str.+23+76275+Ettlingen',
  hours: [
    { days: 'Montag – Freitag', time: '09:00 – 18:00 Uhr' },
    { days: 'Samstag', time: '10:00 – 14:00 Uhr' },
    { days: 'Sonn- & Feiertage', time: 'nach Vereinbarung' },
  ],
}

export const telHref = `tel:${business.phone.replace(/\s+/g, '')}`
export const whatsappHref = `https://wa.me/${business.whatsapp.replace(/[^\d]/g, '')}`
export const mailHref = `mailto:${business.email}`

// Befristete Mittagspause (Montag–Freitag), z. B. wegen Personalengpass o. Ä.
// Nach `endDate` verschwindet der Hinweis automatisch, keine manuelle Rücknahme nötig.
export const temporaryClosure = {
  startDate: '2026-09-01',
  endDate: '2026-10-15',
  weekdayHours: '09:00 – 13:00 Uhr und 15:00 – 18:00 Uhr',
  breakHours: '13:00 – 15:00 Uhr',
  bannerText:
    'Vom 01.09. bis 15.10.2026 machen wir mittags 2 Stunden zu: Montag – Freitag 09:00 – 13:00 Uhr und 15:00 – 18:00 Uhr geöffnet.',
  noteText:
    'Vom 01.09. bis 15.10.2026 sind wir Montag – Freitag von 13:00 – 15:00 Uhr mittags geschlossen.',
}

export function isTemporaryClosureActive(now = new Date()) {
  const start = new Date(`${temporaryClosure.startDate}T00:00:00`)
  const end = new Date(`${temporaryClosure.endDate}T23:59:59`)
  return now >= start && now <= end
}
