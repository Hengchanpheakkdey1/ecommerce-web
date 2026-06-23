import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { getCategories } from '../services/api'
import ProductGrid from '../component/ProductGrid'

export default function CategoryPage() {
  const { id } = useParams()
  const [category, setCategory] = useState(null)

  useEffect(() => {
    getCategories()
      .then((cats) => setCategory(cats.find((c) => String(c.id) === String(id)) ?? null))
      .catch(() => {})
  }, [id])

  return (
    <div style={{ backgroundColor: '#d5e0e8' }} className="pt-10">
      <div className="text-center py-10 px-4">
        {category?.image && (
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 shadow-md">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
          </div>
        )}
        <h1
          className="font-black uppercase text-gray-900 leading-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
        >
          {category ? category.name.toUpperCase() : '...'}
        </h1>
        <p className="text-xs text-gray-500 mt-2 tracking-widest uppercase">
          {category?.name} Collection
        </p>
      </div>

      <ProductGrid
        categoryId={Number(id)}
        limit={20}
        title={`${category?.name?.toUpperCase() ?? 'CATEGORY'} COLLECTION`}
        leftLabel={category?.name?.toUpperCase() ?? ''}
        rightLabel="ALL BRANDS"
      />
    </div>
  )
}
