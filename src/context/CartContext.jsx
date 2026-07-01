import { createContext, useContext, useReducer, useState, useCallback } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.item.id}__${action.item.size}`
      const idx = state.findIndex(i => `${i.id}__${i.size}` === key)
      if (idx !== -1) {
        return state.map((i, n) =>
          n === idx ? { ...i, quantity: i.quantity + action.item.quantity } : i
        )
      }
      return [...state, action.item]
    }
    case 'REMOVE':
      return state.filter(i => `${i.id}__${i.size}` !== action.key)
    case 'SET_QTY':
      return state
        .map(i => `${i.id}__${i.size}` === action.key ? { ...i, quantity: action.qty } : i)
        .filter(i => i.quantity > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [toast, setToast] = useState(null)

  const addItem = useCallback((product, size = 'M', quantity = 1) => {
    dispatch({
      type: 'ADD',
      item: {
        id: product.id,
        title: product.title,
        price: Number(product.price),
        images: product.images,
        category: product.category,
        size,
        quantity,
      },
    })
    setToast({ title: product.title, id: Date.now() })
    setTimeout(() => setToast(null), 2200)
  }, [])

  const removeItem = useCallback((id, size) =>
    dispatch({ type: 'REMOVE', key: `${id}__${size}` }), [])

  const setQty = useCallback((id, size, qty) =>
    dispatch({ type: 'SET_QTY', key: `${id}__${size}`, qty }), [])

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQty, clearCart, totalItems, totalPrice, toast }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
