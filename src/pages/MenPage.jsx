import ProductGrid from '../component/ProductGrid'

export default function MenPage() {
  return (
    <div style={{ backgroundColor: '#d5e0e8' }} className="pt-10">
      <div className="text-center py-10 px-4">
        <h1
          className="font-black uppercase text-gray-900 leading-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
        >
          MEN
        </h1>
        <p className="text-xs text-gray-500 mt-2 tracking-widest">BUILT FOR PERFORMANCE</p>
      </div>
      {/* Category 1 = Clothes in Platzi API */}
      <ProductGrid
        categoryId={1}
        limit={12}
        title="MEN'S COLLECTION"
        leftLabel="MEN"
        rightLabel="ALL BRANDS"
      />
    </div>
  )
}
