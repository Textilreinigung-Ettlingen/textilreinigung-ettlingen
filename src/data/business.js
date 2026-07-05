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
