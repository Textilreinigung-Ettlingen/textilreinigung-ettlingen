import { Phone, MessageCircle } from 'lucide-react'
import { business, telHref, whatsappHref } from '../../data/business'

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-cream/10 bg-ink/95 backdrop-blur-md lg:hidden">
      <a
        href={telHref}
        className="flex flex-1 items-center justify-center gap-2 border-r border-cream/10 py-4 text-sm font-medium text-cream"
      >
        <Phone className="h-4 w-4" strokeWidth={2} />
        Anrufen
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium text-cream"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2} />
        WhatsApp
      </a>
      <span className="sr-only">{business.name}</span>
    </div>
  )
}
