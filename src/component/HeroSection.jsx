import { Link } from 'react-router'

const HERO_MON = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/025.png'

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden" style={{ minHeight: '100svh' }}>

      <style>{`
        @keyframes mewtwo-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-20px) scale(1.01); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.14); }
        }
        @keyframes ring-cw  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes ring-ccw { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        .mewtwo-img {
          animation: mewtwo-float 5s ease-in-out infinite;
          filter:
            drop-shadow(0 0 28px rgba(253,224,71,0.9))
            drop-shadow(0 0 65px rgba(250,204,21,0.55))
            drop-shadow(0 20px 60px rgba(234,179,8,0.3));
        }
        .mewtwo-glow { animation: glow-pulse 5s ease-in-out infinite; }
        .ring-cw     { animation: ring-cw  18s linear infinite; }
        .ring-ccw    { animation: ring-ccw 26s linear infinite; }
      `}</style>

      <div className="flex flex-col md:flex-row" style={{ minHeight: '100svh' }}>

        {/* ── Left — content ── */}
        <div className="relative z-10 flex flex-col justify-center
                        w-full md:w-[46%]
                        px-7 sm:px-12 md:px-14 lg:px-20
                        pt-16 pb-10 md:py-0">

          {/* Label pill */}
          <div className="inline-flex items-center gap-2 mb-8 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
              New Season · 2025
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-black leading-[0.88] tracking-tight text-gray-900 mb-6"
            style={{ fontSize: 'clamp(2.8rem, 5.2vw, 6.5rem)' }}
          >
            Gear Up<br />
            Every<br />
            Season
          </h1>

          {/* Body text */}
          <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mb-9 max-w-[300px]">
            Premium athletic wear built for every world you conquer. Performance meets style.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-5 mb-12 md:mb-16">
            <Link
              to="/shop"
              className="bg-gray-900 text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-black transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors"
            >
              Explore All
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-5 pt-7 border-t border-gray-100">
            <div>
              <p className="text-xl font-black text-gray-900">2,400+</p>
              <p className="text-[10px] font-medium text-gray-400 tracking-widest uppercase mt-0.5">Products</p>
            </div>
            <div className="w-px h-7 bg-gray-100" />
            <div>
              <p className="text-xl font-black text-gray-900">12</p>
              <p className="text-[10px] font-medium text-gray-400 tracking-widest uppercase mt-0.5">Categories</p>
            </div>
            <div className="w-px h-7 bg-gray-100" />
            <div>
              <p className="text-xl font-black text-gray-900">Free</p>
              <p className="text-[10px] font-medium text-gray-400 tracking-widest uppercase mt-0.5">Shipping</p>
            </div>
          </div>
        </div>

        {/* ── Right — Mewtwo ── */}
        <div className="relative w-full md:w-[54%] flex items-center justify-center
                        min-h-[55vw] sm:min-h-[45vw] md:min-h-0">

          {/* Ambient glow */}
          <div
            className="mewtwo-glow absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{
              background:
                'radial-gradient(ellipse 72% 72% at 52% 50%, rgba(253,224,71,0.28) 0%, rgba(250,204,21,0.1) 50%, transparent 74%)',
            }}
          />

          {/* Outer spinning ring */}
          <div className="ring-cw absolute pointer-events-none flex items-center justify-center" style={{
            width: 'clamp(260px,46vw,560px)', height: 'clamp(260px,46vw,560px)',
          }}>
            <div style={{ width:'100%', height:'100%', borderRadius:'50%', border:'1.5px dashed rgba(250,204,21,0.45)' }} />
          </div>

          {/* Inner counter-spinning ring */}
          <div className="ring-ccw absolute pointer-events-none flex items-center justify-center" style={{
            width: 'clamp(180px,32vw,390px)', height: 'clamp(180px,32vw,390px)',
          }}>
            <div style={{ width:'100%', height:'100%', borderRadius:'50%', border:'1.5px dashed rgba(234,179,8,0.35)' }} />
          </div>

          {/* Static solid ring */}
          <div className="absolute pointer-events-none" style={{
            width: 'clamp(310px,54vw,640px)', height: 'clamp(310px,54vw,640px)',
            borderRadius: '50%', border: '1px solid rgba(253,224,71,0.15)',
          }} />

          {/* Pikachu */}
          <img
            src={HERO_MON}
            alt="Pikachu"
            draggable={false}
            className="mewtwo-img relative z-10 select-none"
            style={{ width: 'clamp(240px,48vw,640px)', height: 'auto' }}
          />

          {/* Bottom fade into white */}
          <div
            className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, transparent 100%)' }}
          />
        </div>

      </div>

    </section>
  )
}
