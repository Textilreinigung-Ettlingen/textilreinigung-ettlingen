import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import AccordionItem from '../ui/Accordion'
import { faqs as allFaqs } from '../../data/faq'

export default function FAQ({
  ids,
  eyebrow = 'Häufige Fragen',
  title = 'Antworten, bevor Sie fragen müssen.',
}) {
  const faqs = ids ? allFaqs.filter((f) => ids.includes(f.id)) : allFaqs

  return (
    <section className="relative bg-ink py-28 md:py-36">
      <div className="container-premium grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <div>
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} {...faq} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
