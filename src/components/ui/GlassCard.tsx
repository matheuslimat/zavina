'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Layers, MessageCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { Product } from '@/lib/products'

const FabricViewer = dynamic(() => import('@/components/three/FabricViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-brand-dark animate-pulse" />,
})

export default function GlassCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const [show3D, setShow3D] = useState(false)
  const [liked, setLiked] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden glass"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
      aria-label={`${product.name} – ${product.category}`}
    >
      {/* Image / 3D viewer */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-dark">
        {show3D ? (
          <div className="absolute inset-0">
            <FabricViewer color={product.color} />
          </div>
        ) : imgError ? (
          /* Graceful fallback when image fails */
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `radial-gradient(ellipse at 50% 40%, ${product.color}55 0%, ${product.color}18 60%, transparent 100%)`,
            }}
          >
            <div
              className="w-24 h-24 rounded-full opacity-50"
              style={{ background: product.color }}
            />
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && !show3D && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/10 to-transparent flex flex-col justify-end p-4"
            >
              <motion.button
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.22 }}
                onClick={(e) => { e.stopPropagation(); setShow3D(true) }}
                className="flex items-center gap-2 glass-warm text-brand-cream text-xs px-3 py-2 rounded-full w-fit"
                aria-label="Visualizar textura em 3D"
              >
                <Layers size={11} aria-hidden="true" />
                Textura 3D
              </motion.button>
            </motion.div>
          )}
          {show3D && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShow3D(false)}
              className="absolute bottom-4 left-4 flex items-center gap-1.5 glass-warm text-brand-cream text-xs px-3 py-2 rounded-full z-10"
              aria-label="Voltar para foto"
            >
              ← Foto
            </motion.button>
          )}
        </AnimatePresence>

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v) }}
          className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center"
          aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={liked}
        >
          <Heart
            size={13}
            aria-hidden="true"
            className={liked ? 'fill-brand-terracotta text-brand-terracotta' : 'text-brand-cream/65'}
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-brand-terracotta text-white text-[9px] px-2 py-0.5 tracking-widest uppercase font-body">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-brand-gold/55 mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-xl text-brand-cream mb-3">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-body text-brand-cream/45 text-xs italic">Consulte o valor</span>
          <motion.a
            href={`https://wa.me/558399190391?text=${encodeURIComponent(`Olá! Tenho interesse na peça "${product.name}". Qual o valor?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 bg-brand-gold text-brand-black text-[10px] px-3 py-2 font-body tracking-widest uppercase"
            aria-label={`Perguntar preço de ${product.name} no WhatsApp`}
          >
            <MessageCircle size={11} aria-hidden="true" />
            WhatsApp
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}
