'use client'

const TAGS = [
  'Crochê Artesanal',
  'Feito à Mão',
  'Exclusivo',
  'Copa 2026',
  'Arte Brasileira',
  'Ponto a Ponto',
  'Zavina',
  '100% Algodão',
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...TAGS, ...TAGS]
  return (
    <div className="flex overflow-hidden">
      <div
        className={`marquee-track ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}
        aria-hidden="true"
      >
        {[...items, ...items].map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-5 font-body text-[10px] tracking-[0.42em] uppercase"
          >
            <span className={i % 2 === 0 ? 'text-brand-cream/50' : 'text-brand-gold/50'}>
              {tag}
            </span>
            <span className="text-brand-gold/25">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function MarqueeSection() {
  return (
    <div className="border-y border-brand-gold/10 bg-brand-dark/60 overflow-hidden py-4 space-y-3">
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  )
}
