export interface Product {
  id: string
  name: string
  category: string
  color: string
  image: string
  badge?: string
  description?: string
}

// Real images scraped from @zavina_brand Instagram (Playwright headless browser)
export const products: Product[] = [
  {
    id: '1',
    name: 'Cropped Franjas Off White',
    category: 'Tops',
    color: '#E8D5B7',
    image: '/images/ig/cropped-franja.jpg',
    badge: 'Novo',
    description: 'Cropped de crochê com franjas no fio encanto off white. Versátil e atemporal.',
  },
  {
    id: '2',
    name: 'Top Multiúso',
    category: 'Blusas',
    color: '#B87355',
    image: '/images/ig/uma-peca.jpg',
    description: 'Uma peça, várias formas de usar. Feita à mão com fio 100% algodão.',
  },
  {
    id: '3',
    name: 'Top Off White Artesanal',
    category: 'Tops',
    color: '#F0E6D3',
    image: '/images/ig/branca-off.jpg',
    badge: 'Popular',
    description: 'Elegância atemporal em crochê branco artesanal.',
  },
  {
    id: '4',
    name: 'Conjunto Copa do Brasil',
    category: 'Conjuntos',
    color: '#7A9E7E',
    image: '/images/ig/conjunto-copa.jpg',
    description: 'Croped bandeira + Saia encanto de pérola. Edição especial Copa 2026.',
  },
  {
    id: '5',
    name: 'Cropped Encanto',
    category: 'Tops',
    color: '#C9A96E',
    image: '/images/ig/pecas-croche.jpg',
    badge: 'Último',
    description: 'Crochê artesanal com ponto exclusivo da Zavina.',
  },
  {
    id: '6',
    name: 'Saia Paraíso Tropical',
    category: 'Saias',
    color: '#B87355',
    image: '/images/ig/grid-saia.jpg',
    description: 'Saia paraíso tropical 🇧🇷 peça única feita à mão.',
  },
  {
    id: '7',
    name: 'Top Verde Copa 2026',
    category: 'Tops',
    color: '#7A9E7E',
    image: '/images/ig/top-verde-copa.jpg',
    badge: 'Edição Copa',
    description: '💚💛 Top em crochê temático Copa do Mundo 2026.',
  },
  {
    id: '8',
    name: 'Cropped Encanto Copa',
    category: 'Tops',
    color: '#C9A96E',
    image: '/images/ig/grid-croped.jpg',
    description: 'Croped encanto Copa 2026 — peça artesanal exclusiva.',
  },
  {
    id: '9',
    name: 'Bandana + Plataforma Copa',
    category: 'Acessórios',
    color: '#7A9E7E',
    image: '/images/ig/bandana-plataforma.jpg',
    badge: 'Edição Copa',
    description: 'Bandana bandeira + plataforma Copa do Mundo 2026 🇧🇷.',
  },
  {
    id: '10',
    name: 'Bandana Bandeira Brasil',
    category: 'Acessórios',
    color: '#7A9E7E',
    image: '/images/ig/grid-bandana.jpg',
    description: 'Bandana bandeira 🇧🇷 em crochê artesanal.',
  },
  {
    id: '11',
    name: 'Look Copa do Mundo',
    category: 'Conjuntos',
    color: '#7A9E7E',
    image: '/images/ig/grid-copa.jpg',
    description: '💚💛 Look completo Copa do Mundo em crochê moderno.',
  },
  {
    id: '12',
    name: 'Look Copa com Sapato',
    category: 'Conjuntos',
    color: '#B87355',
    image: '/images/ig/look-copa-shoes.jpg',
    description: '🤍💙💛💚 Look copa do mundo completo com sapato #copadomundo2026.',
  },
]

// For the featured product section
export const featuredImage = '/images/ig/uma-peca.jpg'

// For the About section grid
export const aboutImages = [
  '/images/ig/grid-croped.jpg',
  '/images/ig/grid-bandana.jpg',
  '/images/ig/grid-copa.jpg',
  '/images/ig/branca-off.jpg',
]
