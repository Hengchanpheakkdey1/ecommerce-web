import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-black tracking-tighter">Hanzo</Link>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Gear up for every season, every world. Premium athletic wear built for performance without compromise.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Shop</h3>
            <ul className="flex flex-col gap-2">
              {['Men', 'Women', 'Trending', 'Seasonal', 'Accessories', 'All Products'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Company</h3>
            <ul className="flex flex-col gap-2">
              {['About', 'Careers', 'Press', 'Sustainability', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Stay Updated</h3>
            <p className="text-xs text-gray-400 mb-4">Get early access to new drops and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-gray-800 text-xs text-white placeholder-gray-500 px-3 py-2.5 rounded-l-full outline-none"
              />
              <button className="bg-white text-gray-900 text-[10px] font-bold tracking-wider px-4 rounded-r-full hover:bg-gray-100 transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-gray-500">© 2026 Hanzo. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
