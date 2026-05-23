'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowDown, Sparkles } from 'lucide-react'

const FabricCanvas = dynamic(() => import('@/components/three/FabricCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-brand-black" />,
})

const EASE = [0.76, 0, 0.24, 1] as const

// Editorial photos shown on the right side of the hero (desktop only)
// Usando look-copa-shoes, branca-off e bandana-plataforma para não repetir
// as fotos reservadas para a seção About (grid-saia, pecas-croche, grid-copa, uma-peca)
const HERO_PHOTOS = [
  { src: '/images/ig/look-copa-shoes.jpg',    alt: 'Look Copa completo',      rotate: 1.5 },
  { src: '/images/ig/cropped-franja.jpg',     alt: 'Cropped Franjas Off White', rotate: -1 },
  { src: '/images/ig/bandana-plataforma.jpg', alt: 'Bandana + Plataforma',    rotate: 0.8 },
]

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
        className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/30 pointer-events-none"
      />

      {/* Decorative dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Vertical handle – left edge */}
      <motion.div
        aria-hidden="true"
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-brand-gold/40" />
        <span
          className="font-body text-[9px] tracking-[0.5em] uppercase text-brand-cream/30"
          style={{ writingMode: 'vertical-rl' }}
        >
          @zavina_brand
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-brand-gold/40" />
      </motion.div>

      {/* Main content – two-column on lg+ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">

          {/* ── Text column ── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
          >
            {/* Pill tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="inline-flex items-center gap-2 glass-warm rounded-full px-4 py-1.5 mb-8"
            >
              <Sparkles size={11} className="text-brand-gold" aria-hidden="true" />
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-brand-cream/80">
                Artesanato com alma
              </span>
            </motion.div>

            {/* Headline – espaços entre spans garantem leitura correta pelo Google */}
            <h1 className="font-display text-[clamp(3.8rem,9vw,8.5rem)] leading-[0.86] tracking-tight mb-10">
              <span className="text-gradient block">Crochê </span>
              <span className="text-brand-cream/80 italic block">que conta </span>
              <span className="text-brand-cream block">histórias</span>
            </h1>

            <p className="font-body text-brand-cream/50 text-base max-w-sm mb-10 leading-relaxed">
              Cada ponto, uma intenção. Cada peça, uma obra de arte feita à mão com os melhores fios
              do Brasil.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href="#coleção"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-brand-gold text-brand-black px-9 py-4 font-body text-[10px] tracking-[0.35em] uppercase hover:bg-brand-gold-light transition-colors"
              >
                Ver Coleção
              </motion.a>
              <motion.a
                href="#sobre"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="glass border border-brand-gold/30 text-brand-cream px-9 py-4 font-body text-[10px] tracking-[0.35em] uppercase hover:border-brand-gold/60 transition-all"
              >
                Nossa História
              </motion.a>
            </div>

            {/* Stats strip */}
            <motion.div
              className="flex gap-10 mt-14 pt-10 border-t border-brand-gold/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {[
                { num: '500+', label: 'Peças criadas' },
                { num: '98%',  label: 'Clientes felizes' },
                { num: '3',    label: 'Anos de paixão' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl text-brand-gold shimmer-gold">{s.num}</p>
                  <p className="font-body text-brand-cream/35 text-[10px] tracking-widest uppercase mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Editorial photo stack – desktop only ── */}
          <motion.div
            className="hidden lg:flex flex-col gap-3 w-56 xl:w-64 shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 1.0, ease: EASE }}
            aria-hidden="true"
          >
            {/* Tall hero photo */}
            <motion.div
              className="relative overflow-hidden shadow-2xl"
              style={{ height: 300, borderRadius: '0.75rem', rotate: HERO_PHOTOS[0].rotate }}
              whileHover={{ y: -6, rotate: 0, transition: { duration: 0.32 } }}
            >
              <Image
                src={HERO_PHOTOS[0].src}
                alt={HERO_PHOTOS[0].alt}
                fill
                sizes="256px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/35 to-transparent" />
            </motion.div>

            {/* Two smaller photos side by side */}
            <div className="flex gap-3">
              {HERO_PHOTOS.slice(1).map((photo) => (
                <motion.div
                  key={photo.src}
                  className="relative flex-1 overflow-hidden shadow-2xl"
                  style={{ height: 150, borderRadius: '0.75rem', rotate: photo.rotate }}
                  whileHover={{ y: -4, rotate: 0, transition: { duration: 0.28 } }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Floating label */}
            <motion.div
              className="glass-warm rounded-full px-3 py-1.5 self-start"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-body text-[9px] tracking-[0.35em] uppercase text-brand-gold/80">
                ✦ Copa 2026
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative lines – right side (desktop) */}
      <motion.div
        aria-hidden="true"
        className="absolute right-14 top-1/3 hidden xl:flex flex-col items-end gap-2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        <div className="w-16 h-px bg-brand-gold/35" />
        <div className="w-8 h-px bg-brand-gold/20" />
        <div className="w-12 h-px bg-brand-gold/28" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="font-body text-[9px] tracking-[0.4em] uppercase text-brand-cream/30">
          Scroll
        </span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={13} className="text-brand-gold/60" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  )
}
