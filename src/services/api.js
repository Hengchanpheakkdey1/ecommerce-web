const BASE_URL = 'https://api.escuelajs.co/api/v1'
const LOCAL_PRODUCTS_KEY = 'hanzo_local_products'

function getLocalProducts() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveLocalProduct(product) {
  const existing = getLocalProducts()
  const updated = [...existing.filter((p) => p.id !== product.id), product]
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated))
}

export async function getProducts({ limit = 20, categoryId = null } = {}) {
  let url = `${BASE_URL}/products?limit=${limit}&offset=0`
  if (categoryId) url += `&categoryId=${categoryId}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch products')
  const apiProducts = await res.json()

  const localProducts = getLocalProducts()
  const localFiltered = categoryId
    ? localProducts.filter((p) => String(p.category?.id) === String(categoryId))
    : localProducts
  const apiIds = new Set(apiProducts.map((p) => p.id))
  const merged = [...localFiltered.filter((p) => !apiIds.has(p.id)), ...apiProducts]

  return merged.slice(0, limit + localFiltered.filter((p) => !apiIds.has(p.id)).length)
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('Product not found')
  return res.json()
}

export async function createProduct({ title, price, description, categoryId, images }) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, price: Number(price), description, categoryId: Number(categoryId), images }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const msg = Array.isArray(body.message) ? body.message.join(', ') : (body.message || `Error ${res.status}`)
    throw new Error(msg)
  }
  const product = await res.json()
  saveLocalProduct(product)
  return product
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

const DEAD_HOSTS = ['placeimg.com', 'lorempixel.com']

export function cleanImage(raw) {
  if (!raw) return 'https://picsum.photos/seed/fallback/400/550'
  const str = Array.isArray(raw) ? raw[0] : raw
  const cleaned = String(str).replace(/[\[\]"\\]/g, '').trim()
  if (!cleaned.startsWith('http')) return 'https://picsum.photos/seed/fallback/400/550'
  try {
    const host = new URL(cleaned).hostname
    if (DEAD_HOSTS.some(d => host === d || host.endsWith('.' + d))) {
      return 'https://picsum.photos/seed/fallback/400/550'
    }
  } catch {
    return 'https://picsum.photos/seed/fallback/400/550'
  }
  return cleaned
}
