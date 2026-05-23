'use client'

import { Instagram, Heart, MessageCircle, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Coleção', href: '#coleção' },
  { label: 'Destaque', href: '#destaque' },
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Cuidados com a peça', href: '#sobre' },
]

const WA_LINK = `https://wa.me/558399190391?text=${encodeURIComponent(
  'Olá! Tenho interesse em uma peça da Zavina. Pode me ajudar?'
)}`

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-brand-dark border-t border-brand-gold/10"
    >
      {/* WhatsApp CTA strip */}
      <div className="border-b border-brand-gold/10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-brand-gold mb-2">
              Fale conosco
            </p>
            <h3 className="font-display text-[clamp(1.6rem,3vw,2.8rem)] text-brand-cream leading-tight">
              Sua peça única,{' '}
              <em className="text-brand-gold" style={{ fontStyle: 'italic' }}>
                pronta para você
              </em>
            </h3>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a Zavina no WhatsApp"
            className="shrink-0 flex items-center gap-3 bg-brand-gold text-brand-black px-8 py-4 font-body text-[10px] tracking-[0.35em] uppercase hover:bg-brand-gold-light transition-colors"
          >
            <MessageCircle size={13} aria-hidden="true" />
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display text-4xl text-brand-cream tracking-widest mb-3">Zavina</p>
            <p className="font-body text-sm text-brand-cream/40 leading-relaxed max-w-xs mb-6">
              Crochê artesanal feito com amor e dedicação. Cada peça é única, assim como você.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/zavina_brand/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @zavina_brand"
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-brand-cream/50 hover:text-brand-gold transition-colors"
              >
                <Instagram size={14} aria-hidden="true" />
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Zavina"
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-brand-cream/50 hover:text-brand-gold transition-colors"
              >
                <MessageCircle size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Rodapé – navegação">
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-brand-cream/50 mb-5">
              Navegação
            </p>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body text-sm text-brand-cream/40 hover:text-brand-gold transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={10}
                      aria-hidden="true"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-brand-cream/50 mb-5">
              Contato
            </p>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/zavina_brand/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @zavina_brand (abre em nova aba)"
                className="flex items-center gap-2.5 text-brand-cream/40 hover:text-brand-gold transition-colors text-sm font-body"
              >
                <Instagram size={13} aria-hidden="true" />
                @zavina_brand
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Zavina"
                className="flex items-center gap-2.5 text-brand-cream/40 hover:text-brand-gold transition-colors text-sm font-body"
              >
                <MessageCircle size={13} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-brand-cream/25">
            © 2025 Zavina. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-brand-cream/25 flex items-center gap-1">
            Feito com{' '}
            <Heart
              size={10}
              aria-hidden="true"
              className="text-brand-terracotta fill-brand-terracotta mx-0.5"
            />{' '}
            no Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
