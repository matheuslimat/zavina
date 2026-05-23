import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

// ── Atualize esta URL quando o domínio definitivo estiver ativo ──
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zavinabrand.com.br'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const bodyFont = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Zavina | Crochê Artesanal – Catolé do Rocha, PB',
    template: '%s | Zavina',
  },

  description:
    'Peças únicas de crochê artesanal feitas à mão com Fio Anne e Fio Encanto. Coleção Copa 2026. Tops, saias e conjuntos exclusivos. Envio para todo o Brasil. Catolé do Rocha – PB.',

  keywords: [
    'crochê artesanal',
    'moda crochê',
    'crochê handmade',
    'zavina brand',
    'Fio Anne crochê',
    'peças crochê moda',
    'crochê Copa 2026',
    'crochê Paraíba',
    'crochê Católé do Rocha',
    'conjunto crochê',
    'top crochê artesanal',
    'saia crochê',
  ],

  authors: [{ name: 'Zavina Brand', url: SITE_URL }],
  creator: 'Zavina Brand',

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: 'Zavina | Crochê Artesanal – Católé do Rocha, PB',
    description:
      'Peças únicas de crochê artesanal feitas à mão. Fio Anne, Fio Encanto e Fio Pérola Brilho. Coleção Copa 2026. Envio para todo o Brasil.',
    url: SITE_URL,
    siteName: 'Zavina Brand',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/ig/cropped-franja.jpg',
        width: 1200,
        height: 630,
        alt: 'Cropped Franjas Off White – Zavina Crochê Artesanal',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Zavina | Crochê Artesanal – Católé do Rocha, PB',
    description:
      'Peças únicas de crochê artesanal feitas à mão. Coleção Copa 2026. Envio para todo o Brasil.',
    images: ['/images/ig/cropped-franja.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
