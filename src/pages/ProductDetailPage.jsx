import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { getProductById, cleanImage } from '../services/api'
import { useCart } from '../context/CartContext'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function ProductDetailPage({ onCartOpen }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setActiveImage(0)
    getProductById(id)
      .then((data) => { setProduct(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [id])

  function handleAddToCart() {
    addItem(product, selectedSize ?? 'M', quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    onCartOpen?.()
  }

  if (loading) {
    return (
      <div className="bg-[#d5e0e8] dark:bg-neutral-950 transition-colors duration-300 min-h-screen pt-10">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="rounded-3xl bg-neutral-300 dark:bg-neutral-800 animate-pulse aspect-[3/4]" />
          <div className="flex flex-col gap-4 pt-4">
            <div className="h-4 w-24 bg-neutral-300 dark:bg-neutral-800 animate-pulse rounded-full" />
            <div className="h-10 w-3/4 bg-neutral-300 dark:bg-neutral-800 animate-pulse rounded-xl" />
            <div className="h-6 w-1/4 bg-neutral-300 dark:bg-neutral-800 animate-pulse rounded-full" />
            <div className="h-32 bg-neutral-300 dark:bg-neutral-800 animate-pulse rounded-xl mt-4" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#d5e0e8] dark:bg-neutral-950 transition-colors duration-300 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-900 text-white text-xs font-bold tracking-widest px-6 py-3 rounded-full"
          >
            GO BACK
          </button>
        </div>
      </div>
    )
  }

  const images = Array.isArray(product.images) ? product.images : [product.images]
  const cleanedImages = images.map(cleanImage)

  return (
    <div className="bg-[#d5e0e8] dark:bg-neutral-950 transition-colors duration-300 min-h-screen pt-10">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mb-8 tracking-wider">
          <Link to="/" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold uppercase truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left — image gallery */}
          <div className="flex gap-3">
            {/* Thumbnail strip */}
            {cleanedImages.length > 1 && (
              <div className="flex flex-col gap-2 w-16 flex-shrink-0">
                {cleanedImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === i ? 'border-gray-900 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={src}
                      alt={`View ${i + 1}`}
                      className="w-full aspect-square object-cover"
                      onError={(e) => { e.target.src = 'https://picsum.photos/seed/fallback/100/100' }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 aspect-[3/4] relative">
              <img
                src={cleanedImages[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => { e.target.src = 'https://picsum.photos/seed/fallback/600/800' }}
              />
              {/* Category badge */}
              <span className="absolute top-4 left-4 bg-white/80 dark:bg-black/60 backdrop-blur-sm text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full text-gray-800 dark:text-gray-200">
                {product.category?.name}
              </span>
            </div>
          </div>

          {/* Right — product info */}
          <div className="flex flex-col">
            {/* Category label */}
            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3">
              {product.category?.name}
            </span>

            {/* Title */}
            <h1
              className="font-black text-gray-900 dark:text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}
            >
              {product.title}
            </h1>

            {/* Price */}
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              USD {Number(product.price).toFixed(2)}
            </p>

            {/* Mock rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < 4 ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] text-gray-500">4.0 · 124 reviews</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold tracking-widest text-gray-800 uppercase">Select Size</span>
                <button className="text-[11px] text-gray-500 underline underline-offset-2 hover:text-gray-800">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white'
                        : 'bg-white/60 text-gray-700 border-gray-200 hover:border-gray-900 dark:bg-white/10 dark:text-gray-300 dark:border-white/20 dark:hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3 mb-4">
              {/* Quantity */}
              <div className="flex items-center bg-white/60 dark:bg-white/10 rounded-full border border-gray-200 dark:border-white/20">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold"
                >
                  −
                </button>
                <span className="px-2 text-sm font-bold text-gray-900 dark:text-white min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-full text-xs font-bold tracking-widest transition-all ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-900 text-white hover:bg-black'
                }`}
              >
                {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
              </button>
            </div>

            {/* Wishlist */}
            <button className="w-full py-3 rounded-full text-xs font-bold tracking-widest border-2 border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-400 hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-all mb-8">
              ADD TO WISHLIST
            </button>

            {/* Details accordion-style info */}
            <div className="border-t border-gray-300 dark:border-white/10 pt-5 flex flex-col gap-4 text-[11px] text-gray-500 dark:text-gray-500">
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                Free shipping on orders over USD 100
              </div>
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 10h18M9 21V3m6 0v18" />
                </svg>
                30-day free returns
              </div>
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure checkout
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-14 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            BACK
          </button>
        </div>
      </div>
    </div>
  )
}
