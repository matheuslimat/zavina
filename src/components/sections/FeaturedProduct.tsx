'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { MessageCircle, Ruler, Star, Layers, ImageIcon } from 'lucide-react'
import { featuredImage } from '@/lib/products'

const FabricViewer = dynamic(() => import('@/components/three/FabricViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-brand-dark animate-pulse rounded-3xl" />,
})

const COLORS = [
  { name: 'Terracota', hex: '#B87355' },
  { name: 'Areia',     hex: '#C9A96E' },
  { name: 'Sage',      hex: '#7A9E7E' },
  { name: 'Creme',     hex: '#E8D5B7' },
]
const SIZES    = ['P', 'M', 'G', 'GG']
const FEATURES = [
  { label: 'Fio Anne 8',   sub: 'Círculo – mercerizado' },
  { label: 'Artesanal',    sub: 'Feito à mão' },
  { label: 'Entrega BR',   sub: 'Todo o Brasil' },
]

type ViewMode = 'photo' | '3d'

export default function FeaturedProduct() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [selectedSize,  setSelectedSize]  = useState('')
  const [viewMode,      setViewMode]      = useState<ViewMode>('photo')
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY   = useTransform(scrollYProgress, [0, 1], [50, -50])
  const imgY  = useTransform(scrollYProgress, [0, 1], [20, -20])

  const waLink = `https://wa.me/558399190391?text=${encodeURIComponent(
    'Olá! Tenho interesse na peça "Blusa Boho em Crochê". Qual o valor?'
  )}`

  return (
    <section
      ref={ref}
      id="destaque"
      className="py-32 bg-brand-dark relative overflow-hidden"
      aria-label="Produto em destaque"
    >
      {/* Animated dot grid */}
      <motion.div
        aria-hidden="true"
        style={{
          y: bgY,
          backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
        className="absolute inset-0 opacity-[0.032] pointer-events-none"
      />

      {/* Glow orb */}
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184,115,85,0.13) 0%, transparent 68%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Viewer ── */}
          <div className="scroll-reveal-left">
            <div className="relative aspect-square rounded-3xl overflow-hidden glass">

              <AnimatePresence mode="wait">
                {viewMode === '3d' ? (
                  <motion.div
                    key="3d"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <FabricViewer color={selectedColor.hex} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="photo"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div className="absolute inset-0" style={{ y: imgY }}>
                      <Image
                        src={featuredImage}
                        alt="Blusa Boho em Crochê – destaque da coleção Zavina"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* View toggle */}
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                {([
                  { mode: 'photo' as const, icon: <ImageIcon size={10} />, label: 'Foto' },
                  { mode: '3d'   as const, icon: <Layers     size={10} />, label: 'Tecido 3D' },
                ] as const).map(({ mode, icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`flex items-center gap-1.5 text-[10px] px-3 py-2 rounded-full font-body tracking-widest uppercase transition-all ${
                      viewMode === mode
                        ? 'bg-brand-gold text-brand-black'
                        : 'glass-warm text-brand-cream/65 hover:text-brand-cream'
                    }`}
                    aria-pressed={viewMode === mode}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>

              {/* Color indicator */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  aria-hidden="true"
                  className="w-3 h-3 rounded-full block ring-1 ring-white/20"
                  style={{ background: selectedColor.hex }}
                />
              </div>
            </div>
          </div>

          {/* ── Info ── */}
          <div className="scroll-reveal-right space-y-7">
            {/* Stars */}
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={13} aria-hidden="true" className="fill-brand-gold text-brand-gold" />
              ))}
              <span className="font-body text-brand-cream/40 text-xs ml-2">47 avaliações</span>
            </div>

            <div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-brand-gold mb-3">
                Destaque da Coleção
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-brand-cream leading-tight">
                Blusa Boho{' '}
                <em style={{ fontStyle: 'italic' }}>em Crochê</em>
              </h2>
            </div>

            <p className="font-body text-brand-cream/55 leading-relaxed">
              Tecida em <span className="text-brand-gold/80">Fio Anne 8 da Círculo</span> —
              algodão mercerizado com brilho acetinado natural que mantém o ponto firme lavagem
              após lavagem. Design contemporâneo com técnicas tradicionais do crochê artesanal
              brasileiro.
            </p>

            {/* Color selector */}
            <div>
              <p className="font-body text-brand-cream/45 text-xs mb-3 tracking-wide">
                Cor: <span className="text-brand-cream font-medium">{selectedColor.name}</span>
              </p>
              <div className="flex gap-3" role="radiogroup" aria-label="Selecione a cor">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    role="radio"
                    aria-checked={selectedColor.name === c.name}
                    aria-label={c.name}
                    className={`w-8 h-8 rounded-full transition-all duration-200 ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-brand-gold ring-offset-2 ring-offset-brand-dark scale-110'
                        : 'hover:scale-105 opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-body text-brand-cream/45 text-xs tracking-wide">Tamanho</p>
                <button className="flex items-center gap-1 text-brand-gold text-xs font-body">
                  <Ruler size={11} aria-hidden="true" />
                  Guia de tamanhos
                </button>
              </div>
              <div className="flex gap-2.5" role="radiogroup" aria-label="Selecione o tamanho">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    role="radio"
                    aria-checked={selectedSize === size}
                    aria-label={`Tamanho ${size}`}
                    className={`w-11 h-11 font-body text-sm transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-brand-gold text-brand-black'
                        : 'glass border border-brand-gold/20 text-brand-cream hover:border-brand-gold/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-body text-brand-cream/45 text-sm italic">Consulte o valor</p>
                <p className="font-body text-brand-cream/25 text-xs mt-0.5">via WhatsApp</p>
              </div>
              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 font-body text-xs tracking-[0.3em] uppercase bg-brand-gold text-brand-black hover:bg-brand-gold-light transition-colors duration-300"
                aria-label="Perguntar preço no WhatsApp"
              >
                <MessageCircle size={14} aria-hidden="true" /> Perguntar Valor
              </motion.a>
            </div>

            {/* Feature pills */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-brand-gold/10">
              {FEATURES.map((f) => (
                <div key={f.label} className="text-center">
                  <p className="font-body text-brand-cream text-xs">{f.label}</p>
                  <p className="font-body text-brand-cream/35 text-[10px] mt-0.5">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
