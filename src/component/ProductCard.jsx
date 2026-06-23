import { useState } from 'react'
import { Link } from 'react-router'
import { cleanImage } from '../services/api'

export default function ProductCard({ id, title, price, category, images }) {
  const [liked, setLiked] = useState(false)
  const imageUrl = cleanImage(images?.[0])
  const tagName = category?.name ?? 'New'

  return (
    <Link
      to={`/product/${id}`}
      className="relative rounded-2xl overflow-hidden group cursor-pointer bg-neutral-200 shadow-sm hover:shadow-lg transition-shadow duration-300 block"
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
          <span className="bg-white/80 backdrop-blur-sm text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full text-gray-800">
            {tagName}
          </span>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked) }}
            className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : '#374151'} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm px-3 py-3 flex items-center justify-between">
        <div className="min-w-0 flex-1 mr-2">
          <p className="text-xs font-semibold text-gray-900 truncate">{title}</p>
          <p className="text-[11px] text-gray-500 mt-0.5">USD {Number(price).toFixed(2)}</p>
        </div>
        <div className="flex-shrink-0 bg-white rounded-full p-2 shadow-sm group-hover:shadow-md transition-shadow">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
