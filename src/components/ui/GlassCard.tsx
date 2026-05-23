'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/products'

export default function GlassCard({ product, featured }: { product: Product; featured?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked]     = useState(false)
  const [imgError, setImgError] = useState(false)

  const waLink = `https://wa.me/558399190391?text=${encodeURIComponent(
    `Olá! Tenho interesse na peça "${product.name}". Qual o valor?`
  )}`

  return (
    <motion.article
      className="group relative overflow-hidden h-full flex flex-col bg-brand-dark"
      style={{ borderRadius: featured ? '1rem' : '0.75rem' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
      aria-label={`${product.name} – ${product.category}`}
    >
      {/* ── Image fills all available space above the footer ── */}
      <div className="relative flex-1 overflow-hidden min-h-0">

        {imgError ? (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `radial-gradient(ellipse at 50% 40%, ${product.color}66 0%, ${product.color}22 60%, transparent 100%)`,
            }}
          >
            <span className="font-display text-4xl opacity-20 text-brand-cream">{product.name[0]}</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={featured
              ? '(max-width: 1024px) 100vw, 66vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            onError={() => setImgError(true)}
          />
        )}

        {/* Always-on gradient – makes text readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(13,10,8,0.72) 0%, rgba(13,10,8,0.12) 40%, transparent 100%)',
          }}
        />

        {/* Hover: description + WhatsApp CTA */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex flex-col justify-end pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(13,10,8,0.95) 0%, rgba(13,10,8,0.55) 45%, transparent 100%)',
              }}
            >
              {product.description && (
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.24, delay: 0.04 }}
                  className="font-body text-brand-cream/75 text-xs leading-relaxed px-4 pb-[3.8rem]"
                >
                  {product.description}
                </motion.p>
              )}

              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.22, delay: 0.07 }}
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-brand-gold text-brand-black text-[10px] font-body tracking-[0.32em] uppercase py-3 font-medium"
                aria-label={`Consultar preço de ${product.name} no WhatsApp`}
              >
                <MessageCircle size={10} aria-hidden="true" />
                Consultar no WhatsApp
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-brand-gold text-brand-black text-[9px] px-2.5 py-1 tracking-[0.25em] uppercase font-body font-medium">
            {product.badge}
          </span>
        )}

        {/* Like */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(v => !v) }}
          className="absolute top-3 right-3 w-8 h-8 bg-brand-black/50 backdrop-blur-sm rounded-full flex items-center justify-center z-10 border border-white/10 transition-transform hover:scale-110"
          aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={liked}
        >
          <Heart
            size={12}
            aria-hidden="true"
            className={`transition-colors ${liked ? 'fill-brand-terracotta text-brand-terracotta' : 'text-brand-cream/70'}`}
          />
        </button>

        {/* Category label – bottom-left of image */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="font-body text-[9px] tracking-[0.35em] uppercase text-brand-cream/55">
            {product.category}
          </span>
        </div>
      </div>

      {/* ── Info footer ── */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-brand-gold/8 bg-brand-dark shrink-0">
        <div className="min-w-0">
          <h3 className={`font-display text-brand-cream leading-tight truncate ${featured ? 'text-xl' : 'text-base'}`}>
            {product.name}
          </h3>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar ${product.name}`}
          onClick={(e) => e.stopPropagation()}
          className="ml-3 shrink-0 text-brand-gold/40 hover:text-brand-gold transition-colors"
        >
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  )
}
