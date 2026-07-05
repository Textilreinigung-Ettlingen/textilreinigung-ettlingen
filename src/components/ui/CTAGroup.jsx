import { Phone, MessageCircle, MapPin } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { business, telHref, whatsappHref } from '../../data/business'

export default function CTAGroup({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <MagneticButton href={telHref} className="btn-gold">
        <Phone className="h-4 w-4" strokeWidth={2} />
        {business.phoneDisplay}
      </MagneticButton>
      <MagneticButton href={whatsappHref} target="_blank" rel="noreferrer" className="btn-secondary">
        <MessageCircle className="h-4 w-4" strokeWidth={2} />
        WhatsApp
      </MagneticButton>
      <MagneticButton
        href={business.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-cream/80 underline-offset-4 hover:underline"
      >
        <MapPin className="h-4 w-4" strokeWidth={2} />
        Route planen
      </MagneticButton>
    </div>
  )
}
