import { Instagram, Heart } from 'lucide-react'

const NAV = ['Coleção', 'Sobre', 'Contato', 'Cuidados com a peça']

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-brand-dark border-t border-brand-gold/10 py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <p className="font-display text-4xl text-brand-cream tracking-widest mb-4">Zavina</p>
            <p className="font-body text-sm text-brand-cream/45 leading-relaxed max-w-xs">
              Crochê artesanal feito com amor e dedicação. Cada peça é única, assim como você.
            </p>
          </div>

          <nav aria-label="Rodapé – navegação">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-cream mb-5">
              Navegação
            </p>
            <ul className="space-y-2.5" role="list">
              {NAV.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-body text-sm text-brand-cream/45 hover:text-brand-gold transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-cream mb-5">
              Social
            </p>
            <a
              href="https://www.instagram.com/zavina_brand/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @zavina_brand (abre em nova aba)"
              className="flex items-center gap-2.5 text-brand-cream/45 hover:text-brand-gold transition-colors text-sm font-body"
            >
              <Instagram size={14} aria-hidden="true" />
              @zavina_brand
            </a>
          </div>
        </div>

        <div className="border-t border-brand-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-brand-cream/25">
            © 2024 Zavina. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-brand-cream/25 flex items-center gap-1">
            Feito com{' '}
            <Heart
              size={10}
              aria-hidden="true"
              className="text-brand-terracotta fill-brand-terracotta"
            />{' '}
            no Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
