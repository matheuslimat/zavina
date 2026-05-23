'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram, ArrowUpRight } from 'lucide-react'
import { scaleIn } from '@/lib/animations'
import { aboutImages } from '@/lib/products'

const STATS = [
  { num: '500+', label: 'Peças criadas' },
  { num: '3',    label: 'Anos de paixão' },
  { num: '98%',  label: 'Clientes felizes' },
]

// Editorial labels matching the Copa / verão theme
const GRID_ITEMS = [
  { label: 'Copa 2026',  aspect: 'aspect-[1/1.05]', col: 'col-start-1' },
  { label: 'Artesanal',  aspect: 'aspect-[1/1.3]',  col: 'col-start-2 row-start-1' },
  { label: 'Exclusivo',  aspect: 'aspect-[1/1.3]',  col: 'col-start-2 row-start-2' },
  { label: 'Verão',      aspect: 'aspect-[1/1.05]', col: 'col-start-1 row-start-2' },
] as const

export default function About() {
  return (
    <section
      id="sobre"
      className="py-28 bg-brand-black relative overflow-hidden"
      aria-label="Sobre a Zavina"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184,115,85,0.08) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Text ── */}
          <div className="space-y-8 scroll-reveal-left order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-brand-gold/60" />
                <p className="font-body text-brand-gold text-[10px] tracking-[0.5em] uppercase">
                  Nossa História
                </p>
              </div>
              <h2 className="font-display text-[clamp(2.4rem,4vw,3.8rem)] text-brand-cream leading-[0.92]">
                Cada ponto é um{' '}
                <em className="text-brand-gold" style={{ fontStyle: 'italic' }}>
                  ato de amor
                </em>
              </h2>
            </div>

            <div className="space-y-4 font-body text-brand-cream/55 leading-relaxed text-[0.95rem]">
              <p>
                A Zavina nasceu da paixão pelo crochê e do desejo de criar peças que transcendem o
                tempo. Cada criação é única, carregada de intenção e cuidado artesanal.
              </p>
              <p>
                Trabalhamos exclusivamente com fios de alta qualidade, escolhidos com cuidado para
                garantir que cada peça dure gerações e se torne uma memória afetiva em quem a usa.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-brand-gold/40 pl-5">
              <p className="font-display text-xl text-brand-cream/70 italic leading-relaxed">
                "Arte que se usa, que se sente, que se lembra."
              </p>
            </blockquote>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl text-brand-gold shimmer-gold mb-1">{s.num}</p>
                  <p className="font-body text-brand-cream/40 text-[10px] tracking-widest uppercase">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Instagram CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://www.instagram.com/zavina_brand/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguir @zavina_brand no Instagram (abre em nova aba)"
                className="inline-flex items-center gap-3 glass-warm text-brand-cream px-6 py-3 rounded-full hover:bg-brand-gold/15 transition-all text-sm font-body"
              >
                <Instagram size={15} aria-hidden="true" />
                @zavina_brand
              </a>
              <a
                href={`https://wa.me/558399190391?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre a Zavina.')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com a Zavina no WhatsApp"
                className="inline-flex items-center gap-2 text-brand-gold/70 hover:text-brand-gold transition-colors text-sm font-body"
              >
                <ArrowUpRight size={14} aria-hidden="true" />
                Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* ── Photo grid ── */}
          <div className="scroll-reveal-right order-1 lg:order-2">
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {GRID_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className={`${item.aspect} rounded-xl overflow-hidden relative group`}
                >
                  <Image
                    src={aboutImages[i]}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Gradient + label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                    <span className="font-body text-white/80 text-[9px] tracking-[0.35em] uppercase">
                      {item.label}
                    </span>
                    <span className="text-brand-gold/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </span>
                  </div>

                  {/* Hover shimmer line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
