import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router'
import { getLoggedInUser, logout } from './services/auth'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider, useCart } from './context/CartContext'
import Sidebar from './component/Sidebar'
import Footer from './component/Footer'
import CartDrawer from './component/CartDrawer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import MenPage from './pages/MenPage'
import WomenPage from './pages/WomenPage'
import TrendingPage from './pages/TrendingPage'
import SeasonalPage from './pages/SeasonalPage'
import AccessoriesPage from './pages/AccessoriesPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CreateProductPage from './pages/CreateProductPage'
import CategoryPage from './pages/CategoryPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import FigmaTestPage from './pages/FigmaTestPage'
import ProfilePage from './pages/ProfilePage'

function CartToast() {
  const { toast } = useCart()
  if (!toast) return null
  return (
    <>
      <style>{`
        @keyframes toast-pop {
          0%   { opacity: 0; transform: translateY(16px) scale(0.94); }
          12%  { opacity: 1; transform: translateY(0)    scale(1); }
          78%  { opacity: 1; transform: translateY(0)    scale(1); }
          100% { opacity: 0; transform: translateY(-8px) scale(0.96); }
        }
        .cart-toast { animation: toast-pop 2.2s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
      <div className="cart-toast fixed bottom-6 right-6 z-[90] flex items-center gap-3 bg-gray-900 border border-white/10 text-white rounded-2xl px-4 py-3 shadow-2xl max-w-[280px]">
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Added to cart</p>
          <p className="text-xs font-semibold text-white truncate">{toast.title}</p>
        </div>
      </div>
    </>
  )
}

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(() => getLoggedInUser())
  const toggle = () => setSidebarOpen((o) => !o)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/figma-test'

  useEffect(() => {
    setCurrentUser(getLoggedInUser())
  }, [pathname])

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
    navigate('/login')
  }

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/figma-test" element={<FigmaTestPage />} />
      </Routes>
    )
  }

  return (
    <>
      <Sidebar
        open={sidebarOpen}
        onToggle={toggle}
        currentUser={currentUser}
        onLogout={handleLogout}
        onCartOpen={() => setCartOpen(true)}
      />

      {!sidebarOpen && (
        <button
          onClick={toggle}
          title="Open sidebar"
          className="hidden md:flex fixed top-4 left-3 z-40 bg-[#111] text-white p-2.5 rounded-xl hover:bg-white/20 transition-colors items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      )}

      <div className={`flex flex-col min-h-screen mt-14 md:mt-0 transition-[margin] duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/seasonal" element={<SeasonalPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetailPage onCartOpen={() => setCartOpen(true)} />} />
            <Route path="/create-product" element={<CreateProductPage />} />
            <Route path="/profile" element={<ProfilePage onUserUpdate={setCurrentUser} />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <CartToast />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}
