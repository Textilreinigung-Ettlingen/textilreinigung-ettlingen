import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Icon from './Icon'

const MotionLink = motion(Link)

export default function IconTile({ title, description, from, icon, href, index = 0 }) {
  const Tag = href ? MotionLink : motion.div
  const linkProp = href ? { to: href } : {}

  return (
    <Tag
      {...linkProp}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-cream/10 bg-ink-700 p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-gold/40 hover:shadow-soft md:p-8"
    >
      <div>
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-cream/8 text-cream transition-colors duration-500 group-hover:bg-gold-gradient group-hover:text-ink">
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <h3 className="font-display text-xl font-medium text-cream">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/65">{description}</p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider2 text-gold-light">{from}</span>
        {href && (
          <ArrowUpRight className="h-4 w-4 text-cream/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold-light" />
        )}
      </div>
    </Tag>
  )
}
