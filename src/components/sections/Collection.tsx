'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import { products } from '@/lib/products'
import { fadeUp } from '@/lib/animations'

// Editorial alternating layout:
// Pattern A → hero (col-span-2, row-span-2) + 2 stacked right
// Pattern B → 2 stacked left + hero (col-span-2, row-span-2)
const LAYOUT = [
  { index: 0, cls: 'md:col-span-2 md:row-span-2' },
  { index: 1, cls: '' },
  { index: 2, cls: '' },
  { index: 3, cls: '' },
  { index: 4, cls: '' },
  { index: 5, cls: 'md:col-span-2 md:row-span-2' },
  { index: 6, cls: 'md:col-span-2 md:row-span-2' },
  { index: 7, cls: '' },
  { index: 8, cls: '' },
  { index: 9,  cls: '' },
  { index: 10, cls: '' },
  { index: 11, cls: 'md:col-span-2 md:row-span-2' },
]

export default function Collection() {
  return (
    <section
      id="coleção"
      className="py-28 bg-brand-black"
      aria-label="Coleção de produtos Zavina"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 scroll-reveal">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-brand-gold/60" />
            <p className="font-body text-brand-gold text-[10px] tracking-[0.5em] uppercase">
              Nova Coleção
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] text-brand-cream leading-[0.92]">
              Peças que <em className="text-brand-gold not-italic">encantam</em>
            </h2>
            <p className="font-body text-brand-cream/45 text-sm max-w-xs leading-relaxed md:text-right">
              Cada criação é única. Feita à mão, pensada para durar e encantar por gerações.
            </p>
          </div>
        </div>

        {/* Editorial grid
            — auto-rows-[340px] sets the base row height
            — featured cards span 2 rows = (340 + 340 + gap) ≈ 696px
            — GlassCard uses h-full + flex-col so the image fills remaining space */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[340px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {LAYOUT.map(({ index, cls }) => {
            const product = products[index]
            if (!product) return null
            const isFeatured = cls.includes('row-span-2')
            return (
              <motion.div
                key={product.id}
                className={`${cls} h-full min-h-0`}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <GlassCard product={product} featured={isFeatured} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href="https://www.instagram.com/zavina_brand/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 glass-warm border border-brand-gold/25 text-brand-cream/80 hover:text-brand-cream hover:border-brand-gold/50 px-8 py-3.5 font-body text-[10px] tracking-[0.35em] uppercase transition-all"
          >
            Ver mais no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
