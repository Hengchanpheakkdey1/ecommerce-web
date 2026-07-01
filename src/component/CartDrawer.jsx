import { Link } from 'react-router'
import { useCart } from '../context/CartContext'
import { cleanImage } from '../services/api'

const FREE_SHIP = 100

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, setQty, totalItems, totalPrice, clearCart } = useCart()
  const remaining = Math.max(0, FREE_SHIP - totalPrice)
  const progress = Math.min(100, (totalPrice / FREE_SHIP) * 100)

  return (
    <>
      <style>{`
        @keyframes cart-slide {
          from { transform: translateX(100%); opacity: 0.6; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes cart-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes toast-up {
          0%   { opacity: 0; transform: translateY(16px) scale(0.96); }
          15%  { opacity: 1; transform: translateY(0)    scale(1); }
          80%  { opacity: 1; transform: translateY(0)    scale(1); }
          100% { opacity: 0; transform: translateY(-8px) scale(0.97); }
        }
        .cart-panel  { animation: cart-slide 0.38s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .cart-fade   { animation: cart-fade  0.25s ease both; }
        .cart-item-enter { animation: cart-fade 0.25s ease both; }
      `}</style>

      {/* Toast */}
      {/* rendered via CartToast in App.jsx */}

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="cart-fade fixed inset-0 bg-black/55 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Panel */}
          <aside className="cart-panel fixed right-0 top-0 h-full w-[400px] max-w-[95vw] z-[70] flex flex-col"
            style={{ background: '#0c0c0c', boxShadow: '-8px 0 48px rgba(0,0,0,0.7)' }}>

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black tracking-[0.2em] text-white uppercase">Cart</span>
                {totalItems > 0 && (
                  <span className="bg-white text-gray-900 text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center leading-none">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Close cart"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (

              /* ── Empty state ── */
              <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2">
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-white font-black text-sm tracking-wide mb-1.5">Nothing here yet</p>
                  <p className="text-gray-600 text-xs leading-relaxed">Find something you love and<br />add it to your cart.</p>
                </div>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="bg-white text-gray-900 text-[11px] font-black tracking-widest px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  EXPLORE SHOP
                </Link>
              </div>

            ) : (
              <>
                {/* ── Items ── */}
                <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                  {items.map((item) => {
                    const img = cleanImage(item.images?.[0])
                    const itemKey = `${item.id}__${item.size}`
                    return (
                      <div key={itemKey} className="cart-item-enter flex gap-3 rounded-2xl p-3 border border-white/[0.07]"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>

                        {/* Image */}
                        <div className="w-[62px] h-[62px] rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                          <img
                            src={img}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://picsum.photos/seed/fallback/100/100' }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <p className="text-white text-xs font-semibold leading-tight truncate pr-2">{item.title}</p>
                            <p className="text-gray-600 text-[10px] mt-0.5 tracking-wider">SIZE {item.size}</p>
                          </div>
                          <div className="flex items-center justify-between mt-1.5">
                            {/* Qty stepper */}
                            <div className="flex items-center gap-1 bg-white/[0.08] rounded-full px-1">
                              <button
                                onClick={() =>
                                  item.quantity === 1
                                    ? removeItem(item.id, item.size)
                                    : setQty(item.id, item.size, item.quantity - 1)
                                }
                                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-base font-light"
                              >
                                −
                              </button>
                              <span className="text-white text-[11px] font-bold w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => setQty(item.id, item.size, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-base font-light"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-white text-xs font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-gray-700 hover:text-red-400 transition-colors self-start p-1 mt-0.5 flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* ── Footer ── */}
                <div className="border-t border-white/[0.08] px-5 pt-4 pb-6 flex flex-col gap-4">

                  {/* Free shipping bar */}
                  <div>
                    <p className="text-[10px] tracking-wide mb-2">
                      {remaining > 0 ? (
                        <span className="text-gray-500">
                          <span className="text-white font-bold">${remaining.toFixed(0)}</span> away from free shipping
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✓ You've unlocked free shipping!</span>
                      )}
                    </p>
                    <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                          background: progress >= 100
                            ? '#4ade80'
                            : 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-gray-500">SUBTOTAL</span>
                    <span className="text-white font-black text-xl tracking-tight">${totalPrice.toFixed(2)}</span>
                  </div>

                  {/* Checkout */}
                  <button
                    className="w-full bg-white text-gray-900 font-black text-[11px] tracking-widest py-4 rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all"
                  >
                    CHECKOUT
                  </button>

                  {/* Clear */}
                  <button
                    onClick={clearCart}
                    className="text-center text-[10px] text-gray-700 hover:text-gray-400 transition-colors tracking-wider"
                  >
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </aside>
        </>
      )}
    </>
  )
}
