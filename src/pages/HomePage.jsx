import HeroSection from '../component/HeroSection'
import ProductGrid from '../component/ProductGrid'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductGrid
        limit={8}
        title="FRESH FITS FOR YOUR NEXT WORKOUT!"
        leftLabel="NEW ARRIVAL"
        rightLabel="ALL BRANDS"
      />
    </>
  )
}
