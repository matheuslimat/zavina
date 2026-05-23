import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Collection from '@/components/sections/Collection'
import FeaturedProduct from '@/components/sections/FeaturedProduct'
import About from '@/components/sections/About'
import Location from '@/components/sections/Location'

export default function Home() {
  return (
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
  )
}
