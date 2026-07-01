import ProductGrid from '../component/ProductGrid'

export default function SeasonalPage() {
  return (
    <div className="bg-[#d5e0e8] dark:bg-neutral-950 transition-colors duration-300 pt-10">
      <div className="text-center py-10 px-4">
        <h1
          className="font-black uppercase text-gray-900 dark:text-white leading-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
        >
          SEASONAL
        </h1>
        <p className="text-xs text-gray-500 mt-2 tracking-widest">CURATED FOR EVERY SEASON</p>
      </div>
      <ProductGrid
        categoryId={5}
        limit={12}
        title="SEASONAL DROPS"
        leftLabel="SEASONAL"
        rightLabel="LIMITED EDITION"
      />
    </div>
  )
}
