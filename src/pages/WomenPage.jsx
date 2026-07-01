import ProductGrid from '../component/ProductGrid'

export default function WomenPage() {
  return (
    <div className="bg-[#d5e0e8] dark:bg-neutral-950 transition-colors duration-300 pt-10">
      <div className="text-center py-10 px-4">
        <h1
          className="font-black uppercase text-gray-900 dark:text-white leading-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
        >
          WOMEN
        </h1>
        <p className="text-xs text-gray-500 mt-2 tracking-widest">MOVE WITHOUT LIMITS</p>
      </div>
      {/* Category 2 = Electronics in Platzi but recontextualized as Women's for demo */}
      <ProductGrid
        categoryId={2}
        limit={12}
        title="WOMEN'S COLLECTION"
        leftLabel="WOMEN"
        rightLabel="ALL BRANDS"
      />
    </div>
  )
}
