'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Instagram, Clock } from 'lucide-react'

const NAV_LINKS = ['Coleção', 'Destaque', 'Sobre', 'Contato']

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [cartOpen,  setCartOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Navegação principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark py-3' : 'py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Zavina – página inicial"
            className="font-display text-2xl text-brand-cream tracking-[0.3em] uppercase hover:text-brand-gold transition-colors"
          >
            Zavina
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10" role="list">
            {NAV_LINKS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="font-body text-xs tracking-[0.3em] uppercase text-brand-cream/60 hover:text-brand-gold transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/zavina_brand/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Zavina (abre em nova aba)"
              className="text-brand-cream/60 hover:text-brand-gold transition-colors"
            >
              <Instagram size={17} aria-hidden="true" />
            </a>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Carrinho de compras"
              className="relative text-brand-cream/60 hover:text-brand-gold transition-colors"
            >
              <ShoppingBag size={17} aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-brand-terracotta rounded-full text-[8px] flex items-center justify-center text-white font-bold"
              >
                0
              </span>
            </button>

            <button
              className="md:hidden text-brand-cream"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Cart "em breve" popup ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-brand-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setCartOpen(false)}
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Loja em breve"
              className="fixed z-[61] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm glass-dark border border-brand-gold/20 rounded-2xl p-8 flex flex-col items-center text-center gap-5"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{   opacity: 0, scale: 0.92,  y: 10 }}
              transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Ícone animado */}
              <motion.div
                className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center"
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Clock size={28} className="text-brand-gold" aria-hidden="true" />
              </motion.div>

              <div className="space-y-2">
                <p className="font-body text-[10px] tracking-[0.45em] uppercase text-brand-gold/70">
                  Em breve
                </p>
                <h2 className="font-display text-2xl text-brand-cream leading-tight">
                  Loja online chegando em breve
                </h2>
                <p className="font-body text-brand-cream/50 text-sm leading-relaxed">
                  Estamos preparando algo especial para você. Por enquanto, fale com a gente pelo
                  WhatsApp para fazer seu pedido.
                </p>
              </div>

              <a
                href={`https://wa.me/558399190391?text=${encodeURIComponent('Olá! Gostaria de fazer um pedido na Zavina.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-black py-3.5 font-body text-[10px] tracking-[0.35em] uppercase hover:bg-brand-gold-light transition-colors"
              >
                <ShoppingBag size={12} aria-hidden="true" />
                Pedir pelo WhatsApp
              </a>

              <button
                onClick={() => setCartOpen(false)}
                className="font-body text-[10px] tracking-[0.3em] uppercase text-brand-cream/30 hover:text-brand-cream/60 transition-colors"
                aria-label="Fechar"
              >
                Fechar
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="font-display text-5xl text-brand-cream italic hover:text-brand-gold transition-colors"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
