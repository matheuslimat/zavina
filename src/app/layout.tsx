import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

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
  title: 'Zavina | Crochê Artesanal de Luxo',
  description:
    'Peças únicas de crochê artesanal, criadas com amor e dedicação. Descubra a coleção Zavina.',
  keywords: ['crochê', 'artesanal', 'moda', 'handmade', 'zavina', 'crochet'],
  openGraph: {
    title: 'Zavina | Crochê Artesanal de Luxo',
    description: 'Peças únicas de crochê artesanal, criadas com amor e dedicação.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
