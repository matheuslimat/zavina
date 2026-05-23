export interface Product {
  id: string
  name: string
  category: string
  color: string
  image: string
  badge?: string
  description?: string
}

// Produtos reais @zavina_brand com descrições usando fios brasileiros famosos:
// Fio Anne 8 (Círculo) – algodão mercerizado, brilhoso, estruturado, ícone do crochê fashion
// Fio Encanto (Círculo) – viscose 100%, brilho sofisticado, caimento fluido, ideal para franjas
// Fio Pérola Brilho – acabamento perolado dourado, macio, leve, perfeito para looks especiais
// Fio Barroco (Círculo) – mercerizado especial, super resistente, pontos abertos impecáveis
export const products: Product[] = [
  {
    id: '1',
    name: 'Cropped Franjas Off White',
    category: 'Tops',
    color: '#E8D5B7',
    image: '/images/ig/cropped-franja.jpg',
    badge: 'Novo',
    description: 'Em Fio Encanto off white — viscose 100% com brilho natural e franjas que caem como seda. Versátil e atemporal.',
  },
  {
    id: '2',
    name: 'Top Multiúso',
    category: 'Blusas',
    color: '#B87355',
    image: '/images/ig/uma-peca.jpg',
    description: 'Em Fio Anne 8 da Círculo — algodão mercerizado que garante estrutura, brilho acetinado e durabilidade. Uma peça, infinitas formas de usar.',
  },
  {
    id: '3',
    name: 'Top Off White Artesanal',
    category: 'Tops',
    color: '#F0E6D3',
    image: '/images/ig/branca-off.jpg',
    badge: 'Popular',
    description: 'Em Fio Anne 8 off white — algodão mercerizado com acabamento luminoso. Elegância atemporal em pontos exclusivos Zavina.',
  },
  {
    id: '4',
    name: 'Conjunto Copa do Brasil',
    category: 'Conjuntos',
    color: '#7A9E7E',
    image: '/images/ig/conjunto-copa.jpg',
    description: 'Cropped bandeira + saia em Fio Pérola Brilho — acabamento perolado que realça as cores verde e amarelo da nossa pátria. Edição especial Copa 2026.',
  },
  {
    id: '5',
    name: 'Cropped Encanto',
    category: 'Tops',
    color: '#C9A96E',
    image: '/images/ig/pecas-croche.jpg',
    badge: 'Último',
    description: 'Em Fio Encanto da Círculo — viscose brilhante com caimento fluido e toque macio. Ponto exclusivo desenvolvido pela Zavina.',
  },
  {
    id: '6',
    name: 'Saia Paraíso Tropical',
    category: 'Saias',
    color: '#B87355',
    image: '/images/ig/grid-saia.jpg',
    description: 'Em Fio Barroco mercerizado — resistência superior em pontos abertos amplos. Saia única que celebra o Brasil com leveza e movimento.',
  },
  {
    id: '7',
    name: 'Top Verde Copa 2026',
    category: 'Tops',
    color: '#7A9E7E',
    image: '/images/ig/top-verde-copa.jpg',
    badge: 'Edição Copa',
    description: 'Em Fio Anne 8 verde bandeira — estrutura acetinada que mantém o ponto perfeito lavagem após lavagem. Edição Copa do Mundo 2026.',
  },
  {
    id: '8',
    name: 'Cropped Encanto Copa',
    category: 'Tops',
    color: '#C9A96E',
    image: '/images/ig/grid-croped.jpg',
    description: 'Em Fio Encanto dourado — viscose com brilho intenso que captura a luz em cada movimento. Peça artesanal exclusiva Copa 2026.',
  },
  {
    id: '9',
    name: 'Bandana + Plataforma Copa',
    category: 'Acessórios',
    color: '#7A9E7E',
    image: '/images/ig/bandana-plataforma.jpg',
    badge: 'Edição Copa',
    description: 'Em Fio Pérola Brilho nas cores da bandeira — acabamento perolado que reluz ao sol. Kit completo: bandana + plataforma Copa 2026.',
  },
  {
    id: '10',
    name: 'Bandana Bandeira Brasil',
    category: 'Acessórios',
    color: '#7A9E7E',
    image: '/images/ig/grid-bandana.jpg',
    description: 'Em Fio Anne 8 com tingimento especial bandeira — estrutura firme que mantém o formato. Acessório artesanal Copa do Mundo.',
  },
  {
    id: '11',
    name: 'Look Copa do Mundo',
    category: 'Conjuntos',
    color: '#7A9E7E',
    image: '/images/ig/grid-copa.jpg',
    description: 'Look completo em Fio Anne 8 e Fio Pérola Brilho — combinação de estrutura e luminosidade que eleva o crochê à alta moda copa.',
  },
  {
    id: '12',
    name: 'Look Copa com Sapato',
    category: 'Conjuntos',
    color: '#B87355',
    image: '/images/ig/look-copa-shoes.jpg',
    description: 'Look completo em Fio Encanto e Anne 8 — da cabeça aos pés, o Brasil veste crochê artesanal Zavina. Edição limitada Copa 2026.',
  },
]

// For the featured product section
export const featuredImage = '/images/ig/uma-peca.jpg'

// For the About section grid – fotos distintas do Hero strip e do Featured
// Hero usa: look-copa-shoes, cropped-franja, bandana-plataforma
// Featured usa: uma-peca
export const aboutImages = [
  '/images/ig/grid-saia.jpg',
  '/images/ig/conjunto-copa.jpg',
  '/images/ig/top-verde-copa.jpg',
  '/images/ig/branca-off.jpg',
]
