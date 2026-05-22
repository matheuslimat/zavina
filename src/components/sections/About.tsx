'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { scaleIn } from '@/lib/animations'
import { aboutImages } from '@/lib/products'

const STATS = [
  { num: '500+', label: 'Peças criadas' },
  { num: '3',    label: 'Anos de paixão' },
  { num: '98%',  label: 'Clientes felizes' },
]

const GRID = [
  { label: 'Coleção Verão', aspect: 'aspect-square' },
  { label: 'Especial',      aspect: 'aspect-[1/1.4]' },
  { label: 'Inverno',       aspect: 'aspect-[1/1.4]' },
  { label: 'Básicos',       aspect: 'aspect-square' },
] as const

export default function About() {
  return (
    <section
      id="sobre"
      className="py-32 bg-brand-black relative overflow-hidden"
      aria-label="Sobre a Zavina"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184,115,85,0.09) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div className="space-y-8 scroll-reveal-left">
            <div>
              <p className="font-body text-brand-gold text-[10px] tracking-[0.45em] uppercase mb-5">
                Nossa História
              </p>
              <h2 className="font-display text-[clamp(2.4rem,4vw,3.5rem)] text-brand-cream leading-tight">
                Cada ponto é um{' '}
                <em className="text-brand-gold" style={{ fontStyle: 'italic' }}>
                  ato de amor
                </em>
              </h2>
            </div>

            <div className="space-y-4 font-body text-brand-cream/55 leading-relaxed">
              <p>
                A Zavina nasceu da paixão pelo crochê e do desejo de criar peças que transcendem o
                tempo. Cada criação é única, carregada de intenção e cuidado artesanal.
              </p>
              <p>
                Trabalhamos exclusivamente com fios de alta qualidade, escolhidos com cuidado para
                garantir que cada peça dure gerações e se torne uma memória afetiva em quem a usa.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl text-brand-gold mb-1 shimmer-gold">{s.num}</p>
                  <p className="font-body text-brand-cream/45 text-xs">{s.label}</p>
                </div>
              ))}
            </div>

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
          </div>

          {/* Photo grid */}
          <div className="scroll-reveal-right">
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {GRID.map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className={`${item.aspect} rounded-2xl overflow-hidden relative group`}
                >
                  <Image
                    src={aboutImages[i]}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Dark overlay + label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/65 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-end p-3">
                    <span className="font-body text-white/85 text-[10px] tracking-widest uppercase">
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
