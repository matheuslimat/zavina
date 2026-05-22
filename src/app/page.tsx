import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Collection from '@/components/sections/Collection'
import FeaturedProduct from '@/components/sections/FeaturedProduct'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Collection />
      <FeaturedProduct />
      <About />
      <Footer />
    </main>
  )
}
