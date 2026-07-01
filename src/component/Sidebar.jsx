import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { getCategories, cleanImage } from '../services/api'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

export default function Sidebar({ open, onToggle, currentUser, onLogout, onCartOpen }) {
  const { totalItems } = useCart()
  const { dark, toggle: toggleTheme } = useTheme()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then(setCategories).catch(() => { })
  }, [])

  // Only close the sidebar when navigating on mobile (desktop keeps it open)
  const closeOnMobile = () => { if (window.innerWidth < 768) onToggle() }

  const navCls = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-widest transition-all w-full text-left ${isActive
      ? 'bg-white text-gray-900'
      : 'text-gray-400 hover:text-white hover:bg-white/10'
    }`

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#111] flex items-center justify-between px-5 py-4 border-b border-white/10">
        <Link to="/" className="text-xl font-black text-white tracking-tighter" onClick={closeOnMobile}>
          Hanzo
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={onCartOpen}
            className="relative text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
            aria-label="Open cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-white text-gray-900 text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
          <button onClick={onToggle} className="text-white p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile overlay ─────────────────────────────── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      {/* ── Sidebar panel ─────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#111] flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand + close/toggle button */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-white/10">
          <div>
            <Link
              to="/"
              onClick={closeOnMobile}
              className="text-2xl font-black text-white tracking-tighter hover:text-gray-300 transition-colors"
            >
              Hanzo
            </Link>
            <p className="text-[10px] text-gray-600 tracking-widest mt-0.5 uppercase">Athletic Wear</p>
          </div>

          <div className="flex items-center gap-1">
            {/* Cart button */}
            <button
              onClick={onCartOpen}
              title="Cart"
              className="relative text-gray-500 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
              aria-label="Open cart"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-white text-gray-900 text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Close sidebar */}
            <button
              onClick={onToggle}
              title="Close sidebar"
              className="text-gray-500 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">

          <NavLink to="/" end className={navCls} onClick={closeOnMobile}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
              <path d="M9 21V12h6v9" />
            </svg>
            HOME
          </NavLink>

          <NavLink to="/shop" className={navCls} onClick={closeOnMobile}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            SHOP ALL
          </NavLink>

          {/* Categories */}
          <div className="flex items-center gap-2 px-3 pt-4 pb-1">
            <span className="text-[9px] font-bold text-gray-600 tracking-widest uppercase">Categories</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {categories.length === 0
            ? [...Array(5)].map((_, i) => (
              <div key={i} className="h-9 mx-1 rounded-xl bg-white/5 animate-pulse" />
            ))
            : categories.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.id}`}
                className={navCls}
                onClick={closeOnMobile}
              >
                <div className="w-6 h-6 rounded-md overflow-hidden flex-shrink-0 bg-white/10">
                  <img
                    src={cleanImage(cat.image)}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
                {cat.name.toUpperCase()}
              </NavLink>
            ))}

          {/* Quick links */}
          <div className="flex items-center gap-2 px-3 pt-4 pb-1">
            <span className="text-[9px] font-bold text-gray-600 tracking-widest uppercase">Quick Links</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <NavLink to="/trending" className={navCls} onClick={closeOnMobile}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            TRENDING
          </NavLink>

          <NavLink to="/seasonal" className={navCls} onClick={closeOnMobile}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            SEASONAL
          </NavLink>

          <NavLink to="/accessories" className={navCls} onClick={closeOnMobile}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
            </svg>
            ACCESSORIES
          </NavLink>
        </nav>

        {/* Bottom actions */}
        <div className="px-3 pb-5 pt-3 border-t border-white/10 flex flex-col gap-2">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-widest text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <span className="flex items-center gap-2.5">
              {dark ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              {dark ? 'LIGHT MODE' : 'DARK MODE'}
            </span>
            <div className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${dark ? 'bg-amber-400/70' : 'bg-white/20'}`}>
              <div className={`absolute top-0.5 h-4 w-4 bg-white rounded-full shadow transition-transform duration-300 ${dark ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
          </button>

          <Link
            to="/create-product"
            onClick={closeOnMobile}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-widest text-white bg-white/10 hover:bg-white/20 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            ADD PRODUCT
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/profile"
                onClick={closeOnMobile}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 group-hover:ring-2 group-hover:ring-sky-400/50 transition-all overflow-hidden">
                  {currentUser.avatar
                    ? <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
                    : currentUser.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white truncate">{currentUser.name}</p>
                  <p className="text-[9px] text-gray-500 truncate">{currentUser.email}</p>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 group-hover:text-gray-400 flex-shrink-0 transition-colors">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-widest text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                LOGOUT
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeOnMobile}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-widest bg-white text-gray-900 hover:bg-gray-100 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              SIGN IN / UP
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}
