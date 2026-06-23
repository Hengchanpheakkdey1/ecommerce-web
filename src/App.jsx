import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router'
import { getLoggedInUser, logout } from './services/auth'
import Sidebar from './component/Sidebar'
import Footer from './component/Footer'
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

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentUser, setCurrentUser] = useState(() => getLoggedInUser())
  const toggle = () => setSidebarOpen((o) => !o)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isAuthPage = pathname === '/login' || pathname === '/signup'

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
      </Routes>
    )
  }

  return (
    <>
      <Sidebar open={sidebarOpen} onToggle={toggle} currentUser={currentUser} onLogout={handleLogout} />

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
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
