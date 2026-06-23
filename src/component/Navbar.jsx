import { Link } from 'react-router'
import { useState } from 'react'

const BG = '#d5e0e8'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{ backgroundColor: BG }} className="px-4 pt-3 pb-0">
      <div className="relative max-w-7xl mx-auto">
        {/* Concave corner pieces — match header bg, "bite" into nav bar top corners */}
        <div
          className="absolute top-0 left-0 w-6 h-6 z-20 pointer-events-none"
          style={{ backgroundColor: BG, borderBottomRightRadius: '100%' }}
        />
        <div
          className="absolute top-0 right-0 w-6 h-6 z-20 pointer-events-none"
          style={{ backgroundColor: BG, borderBottomLeftRadius: '100%' }}
        />

        {/* Nav bar */}
        <nav className="relative bg-white/40 backdrop-blur-md rounded-b-3xl px-6 py-3 flex items-center justify-between">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-7">
            {['SHOP', 'MEN', 'WOMEN', 'TRENDING'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-[11px] font-bold tracking-widest text-gray-800 hover:text-black transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-gray-900 absolute left-1/2 -translate-x-1/2"
          >
            VEXO
          </Link>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            {['SEASONAL', 'ACCESSORIES'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-[11px] font-bold tracking-widest text-gray-800 hover:text-black transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link
              to="/signin"
              className="bg-gray-900 text-white text-[11px] font-bold tracking-wider px-5 py-2 rounded-full hover:bg-black transition-colors"
            >
              SIGN IN / UP
            </Link>
            <Link
              to="/create-product"
              title="Add Product"
              className="bg-gray-900 text-white p-2 rounded-full hover:bg-black transition-colors flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Link>
            <button className="bg-gray-900 text-white p-2 rounded-full hover:bg-black transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-auto p-2 text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md rounded-2xl mt-2 p-4 flex flex-col gap-4">
            {['SHOP', 'MEN', 'WOMEN', 'TRENDING', 'SEASONAL', 'ACCESSORIES'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-xs font-bold tracking-widest text-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              to="/signin"
              className="bg-gray-900 text-white text-xs font-bold tracking-wider px-4 py-2 rounded-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              SIGN IN / UP
            </Link>
            <Link
              to="/create-product"
              className="border-2 border-gray-900 text-gray-900 text-xs font-bold tracking-wider px-4 py-2 rounded-full text-center flex items-center justify-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
              ADD PRODUCT
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
