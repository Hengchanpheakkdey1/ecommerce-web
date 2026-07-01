import { useState, useEffect } from 'react'
import { getProducts } from '../services/api'
import ProductCard from './ProductCard'

export default function ProductGrid({
  categoryId = null,
  limit = 8,
  title = 'FRESH FITS FOR YOUR NEXT WORKOUT!',
  leftLabel = 'NEW ARRIVAL',
  rightLabel = 'ALL BRANDS',
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getProducts({ limit, categoryId })
      .then((data) => { setProducts(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [categoryId, limit])

  return (
    <section className="bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300 px-6 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase pt-2">
            {leftLabel}
          </span>
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase pt-2">
            {rightLabel}
          </span>
        </div>

        {/* Main heading */}
        <h2
          className="font-black uppercase text-center text-gray-900 dark:text-white leading-tight mb-10"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
        >
          {title.split(' ').map((word, i) => (
            <span key={i}>
              {i === 3 || i === 6
                ? <span className="italic font-black">{word} </span>
                : `${word} `}
            </span>
          ))}
        </h2>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" style={{ aspectRatio: '3/4' }} />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-sm">Failed to load products. Please try again.</p>
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
