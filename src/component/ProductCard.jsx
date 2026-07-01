import { useState } from 'react'
import { Link } from 'react-router'
import { cleanImage } from '../services/api'
import { useCart } from '../context/CartContext'

export default function ProductCard({ id, title, price, category, images }) {
  const { addItem } = useCart()
  const [liked, setLiked] = useState(false)
  const [quickAdded, setQuickAdded] = useState(false)
  const imageUrl = cleanImage(images?.[0])
  const tagName = category?.name ?? 'New'

  function handleQuickAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id, title, price, images, category }, 'M', 1)
    setQuickAdded(true)
    setTimeout(() => setQuickAdded(false), 1800)
  }

  return (
    <Link
      to={`/product/${id}`}
      className="relative rounded-2xl overflow-hidden group cursor-pointer bg-neutral-200 dark:bg-neutral-800 shadow-sm hover:shadow-xl transition-shadow duration-300 block"
    >
      {/* Product image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://picsum.photos/seed/fallback/400/550' }}
        />

        {/* Top-right badges */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <span className="bg-white/80 dark:bg-black/60 backdrop-blur-sm text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full text-gray-800 dark:text-gray-200">
            {tagName}
          </span>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked) }}
            className="bg-white/80 dark:bg-black/60 backdrop-blur-sm p-1.5 rounded-full hover:bg-white dark:hover:bg-black/80 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : '#374151'} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Quick-add overlay — slides up from bottom on hover */}
        <div className="absolute inset-x-0 bottom-0 px-3 pb-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 rounded-full text-[11px] font-black tracking-widest transition-all duration-200 backdrop-blur-sm shadow-lg ${
              quickAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-white/90 text-gray-900 hover:bg-white'
            }`}
          >
            {quickAdded ? '✓ ADDED' : '+ QUICK ADD'}
          </button>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-black/70 backdrop-blur-sm px-3 py-3 flex items-center justify-between">
        <div className="min-w-0 flex-1 mr-2">
          <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{title}</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">USD {Number(price).toFixed(2)}</p>
        </div>
        <div className="flex-shrink-0 bg-white dark:bg-neutral-700 rounded-full p-2 shadow-sm group-hover:shadow-md transition-shadow">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-900 dark:text-white">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
