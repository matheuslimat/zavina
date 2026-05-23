import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Collection from '@/components/sections/Collection'
import FeaturedProduct from '@/components/sections/FeaturedProduct'
import About from '@/components/sections/About'
import Location from '@/components/sections/Location'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zavina.com.br'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'Zavina Brand',
      description:
        'Peças únicas de crochê artesanal feitas à mão com Fio Anne, Fio Encanto e Fio Pérola Brilho. Coleção Copa 2026.',
      url: SITE_URL,
      telephone: '+558399190391',
      image: `${SITE_URL}/images/ig/cropped-franja.jpg`,
      logo: `${SITE_URL}/images/ig/cropped-franja.jpg`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Cantidiano de Andrade, 790',
        addressLocality: 'Católé do Rocha',
        addressRegion: 'PB',
        postalCode: '58884-000',
        addressCountry: 'BR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -6.3445,
        longitude: -37.7385,
      },
      sameAs: ['https://www.instagram.com/zavina_brand/'],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '14:00',
        },
      ],
      priceRange: '$$',
      currenciesAccepted: 'BRL',
      paymentAccepted: 'PIX, transferência bancária',
      areaServed: {
        '@type': 'Country',
        name: 'Brasil',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Zavina Brand',
      inLanguage: 'pt-BR',
      publisher: { '@id': `${SITE_URL}/#business` },
    },
  ],
}

export default function Home() {
  return (
    <>
      {/* Dados estruturados para o Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <Navbar />
        <Hero />
        <Marquee />
        <Collection />
        <FeaturedProduct />
        <About />
        <Location />
        <Footer />
      </main>
    </>
  )
}
