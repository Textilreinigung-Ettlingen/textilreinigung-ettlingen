import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div className="border-b border-cream/10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg font-medium text-cream md:text-xl">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/20"
        >
          <Plus className="h-4 w-4 text-cream" strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 max-w-2xl text-cream/65 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
