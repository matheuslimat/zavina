'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, Clock, Instagram, MessageCircle } from 'lucide-react'

const ZavinaMap = dynamic(() => import('@/components/map/ZavinaMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-brand-dark animate-pulse">
      <MapPin size={32} className="text-brand-gold/40" aria-hidden="true" />
    </div>
  ),
})

const INFO_ITEMS = [
  {
    icon: MapPin,
    label: 'Endereço',
    lines: ['Rua Cantidiano de Andrade, 790', 'Catolé do Rocha – PB', 'CEP 58884-000'],
    link: {
      href: 'https://www.google.com/maps/search/Rua+Cantidiano+de+Andrade+790+Catol%C3%A9+do+Rocha+PB',
      label: 'Como chegar ↗',
    },
  },
  {
    icon: Clock,
    label: 'Atendimento',
    lines: ['Seg – Sex: 9h às 18h', 'Sáb: 9h às 14h', 'Entrega em todo o Brasil'],
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    lines: ['(83) 9919-0391', 'Resposta rápida garantida'],
    link: {
      href: `https://wa.me/558399190391?text=${encodeURIComponent('Olá! Tenho interesse em uma peça da Zavina.')}`,
      label: 'Chamar no WhatsApp ↗',
    },
  },
  {
    icon: Instagram,
    label: 'Instagram',
    lines: ['@zavina_brand', 'Novidades todo dia'],
    link: {
      href: 'https://www.instagram.com/zavina_brand/',
      label: 'Seguir ↗',
    },
  },
]

export default function Location() {
  return (
    <section
      id="contato"
      className="py-28 bg-brand-dark relative overflow-hidden"
      aria-label="Localização e contato da Zavina"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 scroll-reveal">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-brand-gold/60" />
            <p className="font-body text-brand-gold text-[10px] tracking-[0.5em] uppercase">
              Onde nos encontrar
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] text-brand-cream leading-[0.92]">
              Visite a{' '}
              <em className="text-brand-gold" style={{ fontStyle: 'italic' }}>Zavina</em>
            </h2>
            <p className="font-body text-brand-cream/40 text-sm max-w-xs leading-relaxed md:text-right">
              Estamos em Catolé do Rocha – PB.<br />
              Enviamos para todo o Brasil.
            </p>
          </div>
        </div>

        {/* Two-column layout: map + info */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-stretch">

          {/* ── Map ── */}
          <motion.div
            className="relative rounded-2xl overflow-hidden border border-brand-gold/12 h-[460px] lg:h-auto lg:min-h-[460px]"
            style={{ height: 460 }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ZavinaMap />

            {/* Address pill overlaid on map */}
            <div className="absolute bottom-4 left-4 z-[1000] glass-warm rounded-full px-4 py-2 flex items-center gap-2 pointer-events-none">
              <MapPin size={11} className="text-brand-gold shrink-0" aria-hidden="true" />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-brand-cream/80 whitespace-nowrap">
                Catolé do Rocha – PB
              </span>
            </div>
          </motion.div>

          {/* ── Info cards ── */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          >
            {INFO_ITEMS.map(({ icon: Icon, label, lines, link }) => (
              <div
                key={label}
                className="glass border border-brand-gold/10 rounded-xl p-5 flex flex-col gap-3 hover:border-brand-gold/25 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-gold/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-brand-gold" aria-hidden="true" />
                  </div>
                  <p className="font-body text-[10px] tracking-[0.38em] uppercase text-brand-gold/70">
                    {label}
                  </p>
                </div>
                <div className="space-y-0.5">
                  {lines.map((line, i) => (
                    <p
                      key={i}
                      className={`font-body leading-relaxed ${i === 0 ? 'text-brand-cream text-sm' : 'text-brand-cream/45 text-xs'}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                {link && (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[10px] tracking-[0.28em] uppercase text-brand-gold/60 hover:text-brand-gold transition-colors self-start"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
