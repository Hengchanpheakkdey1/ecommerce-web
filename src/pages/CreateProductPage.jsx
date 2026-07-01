import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { createProduct, getCategories } from '../services/api'
import { useTheme } from '../context/ThemeContext'

const EMPTY_FORM = {
  title: '',
  price: '',
  description: '',
  categoryId: '',
  images: [''],
}

function validate(form) {
  const errors = {}
  if (!form.title.trim()) errors.title = 'Title is required'
  if (!form.price || Number(form.price) <= 0) errors.price = 'Enter a valid price'
  if (!form.description.trim()) errors.description = 'Description is required'
  if (!form.categoryId) errors.categoryId = 'Select a category'
  const validImages = form.images.filter((u) => u.trim())
  if (validImages.length === 0) errors.images = 'At least one image URL is required'
  else if (validImages.some((u) => { try { new URL(u); return false } catch { return true } }))
    errors.images = 'Each image must be a valid URL (e.g. https://example.com/image.jpg)'
  return errors
}

export default function CreateProductPage() {
  const navigate = useNavigate()
  const { dark } = useTheme()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [apiError, setApiError] = useState('')
  const [createdProduct, setCreatedProduct] = useState(null)

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {})
  }, [])

  function handleField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function handleImageChange(index, value) {
    const next = [...form.images]
    next[index] = value
    setForm((f) => ({ ...f, images: next }))
    if (errors.images) setErrors((e) => ({ ...e, images: undefined }))
  }

  function addImageField() {
    if (form.images.length < 4) setForm((f) => ({ ...f, images: [...f.images, ''] }))
  }

  function removeImageField(index) {
    if (form.images.length === 1) return
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('loading')
    setApiError('')
    try {
      const validImages = form.images.filter((u) => u.trim())
      const product = await createProduct({ ...form, images: validImages })
      setCreatedProduct(product)
      setStatus('success')
    } catch (err) {
      setApiError(err.message)
      setStatus('error')
    }
  }

  // ── Success screen ──────────────────────────────────────────────
  if (status === 'success' && createdProduct) {
    return (
      <div className="bg-[#d5e0e8] dark:bg-neutral-950 transition-colors duration-300 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Product Created!</h2>
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-semibold text-gray-800">{createdProduct.title}</span> was added successfully.
          </p>
          <p className="text-xs text-gray-400 mb-8">ID: #{createdProduct.id}</p>
          <div className="flex flex-col gap-3">
            <Link
              to={`/product/${createdProduct.id}`}
              className="w-full bg-gray-900 text-white text-xs font-bold tracking-widest py-3 rounded-full hover:bg-black transition-colors"
            >
              VIEW PRODUCT
            </Link>
            <Link
              to="/shop"
              className="w-full border-2 border-gray-200 text-gray-700 text-xs font-bold tracking-widest py-3 rounded-full hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              GO TO SHOP
            </Link>
            <button
              onClick={() => { setForm(EMPTY_FORM); setStatus('idle'); setCreatedProduct(null) }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1"
            >
              Add another product
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────
  return (
    <div className="bg-[#d5e0e8] dark:bg-neutral-950 transition-colors duration-300 min-h-screen pt-10 pb-16">
      <div className="max-w-2xl mx-auto px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mb-8 tracking-wider">
          <Link to="/" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold">ADD PRODUCT</span>
        </nav>

        {/* Page title */}
        <div className="mb-8">
          <h1
            className="font-black uppercase text-gray-900 dark:text-white leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            ADD NEW
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: `2.5px ${dark ? '#fff' : '#111'}` }}>PRODUCT</span>
          </h1>
          <p className="text-xs text-gray-500 mt-3 tracking-wider">Fill in the details below to add a product to the store.</p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 flex flex-col gap-7">

            {/* Title */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                Product Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleField('title', e.target.value)}
                placeholder="e.g. ASRV x Equinox Lycra Set"
                className={`w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all border-2 ${
                  errors.title ? 'border-red-400' : 'border-transparent focus:border-gray-400'
                }`}
              />
              {errors.title && <p className="text-[11px] text-red-500 mt-1.5">{errors.title}</p>}
            </div>

            {/* Price + Category row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Price (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => handleField('price', e.target.value)}
                    placeholder="0.00"
                    className={`w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl pl-7 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all border-2 ${
                      errors.price ? 'border-red-400' : 'border-transparent focus:border-gray-400'
                    }`}
                  />
                </div>
                {errors.price && <p className="text-[11px] text-red-500 mt-1.5">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Category *
                </label>
                <select
                  value={form.categoryId}
                  onChange={(e) => handleField('categoryId', e.target.value)}
                  className={`w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition-all border-2 appearance-none cursor-pointer ${
                    errors.categoryId ? 'border-red-400' : 'border-transparent focus:border-gray-400'
                  } ${!form.categoryId ? 'text-gray-400' : ''}`}
                >
                  <option value="" disabled>Select...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-[11px] text-red-500 mt-1.5">{errors.categoryId}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => handleField('description', e.target.value)}
                placeholder="Describe the product — materials, fit, features..."
                className={`w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all border-2 resize-none ${
                  errors.description ? 'border-red-400' : 'border-transparent focus:border-gray-400'
                }`}
              />
              {errors.description && <p className="text-[11px] text-red-500 mt-1.5">{errors.description}</p>}
            </div>

            {/* Image URLs */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                Image URLs * <span className="normal-case font-normal">(up to 4)</span>
              </label>
              <div className="flex flex-col gap-2">
                {form.images.map((url, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </span>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleImageChange(i, e.target.value)}
                        placeholder={`https://example.com/image-${i + 1}.jpg`}
                        className={`w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all border-2 ${
                          errors.images ? 'border-red-400' : 'border-transparent focus:border-gray-400'
                        }`}
                      />
                    </div>
                    {form.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(i)}
                        className="flex-shrink-0 w-9 h-9 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.images && <p className="text-[11px] text-red-500 mt-1.5">{errors.images}</p>}
              {form.images.length < 4 && (
                <button
                  type="button"
                  onClick={addImageField}
                  className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add another image
                </button>
              )}
            </div>

            {/* Image preview row */}
            {form.images.some((u) => u.trim().startsWith('http')) && (
              <div>
                <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Preview</p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {form.images.filter((u) => u.trim().startsWith('http')).map((url, i) => (
                    <div key={i} className="flex-shrink-0 w-24 h-28 rounded-xl overflow-hidden bg-neutral-200">
                      <img
                        src={url}
                        alt={`Preview ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* API error */}
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                <p className="text-xs text-red-600">{apiError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gray-900 text-white text-xs font-bold tracking-widest py-4 rounded-full hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  CREATING PRODUCT...
                </>
              ) : (
                'CREATE PRODUCT'
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}
