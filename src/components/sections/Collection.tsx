'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import { products } from '@/lib/products'
import { stagger, fadeUp } from '@/lib/animations'

export default function Collection() {
  return (
    <section
      id="coleção"
      className="py-32 bg-brand-black"
      aria-label="Coleção de produtos Zavina"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 scroll-reveal">
          <p className="font-body text-brand-gold text-[10px] tracking-[0.45em] uppercase mb-5">
            Nova Coleção
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] text-brand-cream leading-tight">
              Peças que <em className="text-brand-gold not-italic">encantam</em>
            </h2>
            <p className="font-body text-brand-cream/45 text-sm max-w-xs leading-relaxed">
              Cada criação é única. Feita à mão, pensada para durar e encantar por gerações.
            </p>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              custom={i}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              <GlassCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-14 scroll-reveal">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="border border-brand-gold/40 text-brand-cream px-12 py-4 font-body text-xs tracking-[0.3em] uppercase hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
          >
            Ver Todos os Produtos
          </motion.button>
        </div>
      </div>
    </section>
  )
}
