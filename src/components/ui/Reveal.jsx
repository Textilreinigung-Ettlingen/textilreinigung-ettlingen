import { motion } from 'framer-motion'

const variants = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
}

export default function Reveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  once = true,
  amount = 0.3,
  ...rest
}) {
  const MotionTag = motion[Tag] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[direction]}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
