import { Link } from 'react-router'

const HERO_MON = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/025.png'

export default function HeroSection() {
  return (
    <section className="relative bg-white" style={{ minHeight: '100svh' }}>

      <style>{`
        @keyframes pika-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-18px) scale(1.01); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes ring-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes ring-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }

        .pika-img  { animation: pika-float  5s ease-in-out infinite; filter: drop-shadow(0 0 28px rgba(253,224,71,0.85)) drop-shadow(0 0 60px rgba(250,204,21,0.5)); }
        .pika-glow { animation: glow-pulse  5s ease-in-out infinite; }
        .ring-cw   { animation: ring-cw  18s linear infinite; }
        .ring-ccw  { animation: ring-ccw 26s linear infinite; }
      `}</style>

      <div className="flex flex-col md:flex-row" style={{ minHeight: '100svh' }}>

        {/* ── Left — text content ── */}
        <div className="relative z-10 flex flex-col justify-center
                        w-full md:w-[46%]
                        px-7 sm:px-10 md:px-14 lg:px-20
                        pt-8 pb-6 md:py-0">

          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-4 md:mb-8 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">New Season · 2025</span>
          </div>

          {/* Heading */}
          <h1
            className="font-black leading-[0.88] tracking-tight text-gray-900 mb-3 md:mb-6"
            style={{ fontSize: 'clamp(2.6rem, 5.2vw, 6.5rem)' }}
          >
            Gear Up<br />Every<br />Season
          </h1>

          {/* Subtext */}
          <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mb-5 md:mb-9 max-w-[300px]">
            Premium athletic wear built for every world you conquer. Performance meets style.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 mb-6 md:mb-16">
            <Link to="/shop" className="bg-gray-900 text-white text-sm font-semibold px-6 md:px-7 py-3 md:py-3.5 rounded-full hover:bg-black transition-colors">
              Shop Now
            </Link>
            <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors">
              Explore All
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 md:gap-5 pt-5 md:pt-7 border-t border-gray-100">
            <div>
              <p className="text-lg md:text-xl font-black text-gray-900">2,400+</p>
              <p className="text-[10px] font-medium text-gray-400 tracking-widest uppercase mt-0.5">Products</p>
            </div>
            <div className="w-px h-7 bg-gray-100" />
            <div>
              <p className="text-lg md:text-xl font-black text-gray-900">12</p>
              <p className="text-[10px] font-medium text-gray-400 tracking-widest uppercase mt-0.5">Categories</p>
            </div>
            <div className="w-px h-7 bg-gray-100" />
            <div>
              <p className="text-lg md:text-xl font-black text-gray-900">Free</p>
              <p className="text-[10px] font-medium text-gray-400 tracking-widest uppercase mt-0.5">Shipping</p>
            </div>
          </div>
        </div>

        {/* ── Right — Pikachu ── */}
        <div className="relative w-full md:w-[54%] flex items-center justify-center py-10 md:py-0">

          {/* Size anchor — rings are sized relative to this */}
          <div className="relative flex items-center justify-center"
            style={{ width: 'clamp(240px, 72vw, 520px)', height: 'clamp(240px, 72vw, 520px)' }}>

            {/* Ambient glow */}
            <div className="pika-glow absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(253,224,71,0.32) 0%, rgba(250,204,21,0.12) 50%, transparent 75%)' }} />

            {/* Outer spinning ring */}
            <div className="ring-cw absolute inset-0 rounded-full pointer-events-none"
              style={{ border: '1.5px dashed rgba(250,204,21,0.5)' }} />

            {/* Inner counter-spinning ring — 68% of outer */}
            <div className="ring-ccw absolute pointer-events-none rounded-full"
              style={{
                width: '68%', height: '68%',
                border: '1.5px dashed rgba(234,179,8,0.38)',
              }} />

            {/* Static outer ring — 125% of anchor */}
            <div className="absolute pointer-events-none rounded-full"
              style={{
                width: '125%', height: '125%',
                border: '1px solid rgba(253,224,71,0.14)',
              }} />

            {/* Pikachu */}
            <img
              src={HERO_MON}
              alt="Pikachu"
              draggable={false}
              className="pika-img relative z-10 select-none"
              style={{ width: '88%', height: 'auto' }}
            />
          </div>

        </div>

      </div>

    </section>
  )
}
