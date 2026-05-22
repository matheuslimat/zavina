'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ArrowDown, Sparkles } from 'lucide-react'

const FabricCanvas = dynamic(() => import('@/components/three/FabricCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-brand-black" />,
})

const HERO_VARIANTS = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.5 },
  },
}

export default function Hero() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center"
      aria-label="Apresentação da Zavina"
    >
      {/* 3D Canvas background */}
      <div className="absolute inset-0" aria-hidden="true">
        <FabricCanvas />
      </div>

      {/* Gradient overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-transparent pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/30 pointer-events-none"
      />

      {/* Decorative dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        <motion.div variants={HERO_VARIANTS} initial="hidden" animate="visible">
          {/* Pill tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex items-center gap-2 glass-warm rounded-full px-4 py-1.5 mb-8"
          >
            <Sparkles size={11} className="text-brand-gold" aria-hidden="true" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-brand-cream/80">
              Artesanato com alma
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.88] tracking-tight mb-8">
            <span className="text-gradient block">Crochê</span>
            <span className="text-brand-cream/85 italic block">que conta</span>
            <span className="text-brand-cream block">histórias</span>
          </h1>

          <p className="font-body text-brand-cream/55 text-lg max-w-md mb-10 leading-relaxed">
            Cada ponto, uma intenção. Cada peça, uma obra de arte feita à mão com os melhores fios
            do Brasil.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#coleção"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-gold text-brand-black px-8 py-3.5 font-body text-xs tracking-[0.3em] uppercase hover:bg-brand-gold-light transition-colors"
            >
              Ver Coleção
            </motion.a>
            <motion.a
              href="#sobre"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="glass border border-brand-gold/30 text-brand-cream px-8 py-3.5 font-body text-xs tracking-[0.3em] uppercase hover:border-brand-gold/65 transition-all"
            >
              Nossa História
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative lines – right side */}
      <motion.div
        aria-hidden="true"
        className="absolute right-14 top-1/3 hidden lg:flex flex-col items-end gap-2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
      >
        <div className="w-16 h-px bg-brand-gold/45" />
        <div className="w-8 h-px bg-brand-gold/25" />
        <div className="w-12 h-px bg-brand-gold/35" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="font-body text-[9px] tracking-[0.4em] uppercase text-brand-cream/35">
          Scroll
        </span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={13} className="text-brand-gold/70" />
        </motion.div>
      </motion.div>
    </section>
  )
}
