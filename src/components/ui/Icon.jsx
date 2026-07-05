import {
  Shirt,
  WashingMachine,
  Gem,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Hand,
  Tag,
  Leaf,
} from 'lucide-react'

const icons = {
  hanger: Shirt,
  wash: WashingMachine,
  dress: Gem,
  rug: LayoutGrid,
  shield: ShieldCheck,
  sparkle: Sparkles,
  hand: Hand,
  tag: Tag,
  leaf: Leaf,
}

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.5 }) {
  const Cmp = icons[name] ?? Sparkles
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
