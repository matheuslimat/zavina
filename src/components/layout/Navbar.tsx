'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Instagram } from 'lucide-react'

const NAV_LINKS = ['Coleção', 'Destaque', 'Sobre', 'Contato']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
              aria-label="Carrinho de compras – 0 itens"
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
