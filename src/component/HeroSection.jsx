import { Link } from 'react-router'


export default function HeroSection() {
  return (
    <section
      className="relative min-h-[65vh] md:min-h-[88vh] flex flex-col items-center overflow-hidden pt-4 md:pt-10 pb-0"
      style={{ backgroundColor: '#d5e0e8' }}
    >
      {/* Radial glow behind hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 55%, rgba(255,255,255,0.55) 0%, transparent 70%)',
        }}
      />

      {/* Perspective lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {[...Array(8)].map((_, i) => {
          const angle = -60 + i * 20
          const rad = (angle * Math.PI) / 180
          return (
            <line
              key={i}
              x1="600"
              y1="400"
              x2={600 + Math.cos(rad) * 900}
              y2={400 + Math.sin(rad) * 700}
              stroke="#94a3b8"
              strokeWidth="0.8"
            />
          )
        })}
      </svg>

      {/* Hero heading */}
      <div className="relative z-10 text-center px-4 mt-3 md:mt-6">
        <h1
          className="font-black uppercase leading-none text-gray-900"
          style={{ fontSize: 'clamp(2rem, 7vw, 6.5rem)', letterSpacing: '-0.03em' }}
        >
          GEAR UP EVERY SEASON
        </h1>
        <h1
          className="font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2rem, 7vw, 6.5rem)', letterSpacing: '-0.03em' }}
        >
          <span className="text-gray-900">EVERY </span>
          <span className="font-black italic" style={{ fontStyle: 'italic', color: 'transparent', WebkitTextStroke: '2.5px #111' }}>
            W
          </span>
          <span className="text-gray-900">OR</span>
          <span style={{ color: 'transparent', WebkitTextStroke: '2.5px #111' }}>LD</span>
        </h1>
      </div>

      {/* CTA Buttons */}
      <div className="relative z-20 flex items-center gap-3 mt-5 md:mt-7">
        <Link
          to="/shop"
          className="bg-gray-900 text-white text-[10px] md:text-[11px] font-bold tracking-widest px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-black transition-colors"
        >
          SHOP NOW
        </Link>
        <Link
          to="/shop"
          className="bg-white text-gray-900 text-[10px] md:text-[11px] font-bold tracking-widest px-6 md:px-8 py-3 md:py-3.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          EXPLORE ALL
        </Link>
      </div>

      {/* Pokemon Trio */}
      <style>{`
        @keyframes nido-float  { 0%,100%{transform:translateY(0px) rotate(-1deg)} 50%{transform:translateY(-20px) rotate(1deg)} }
        @keyframes pika-float  { 0%,100%{transform:translateY(0px) rotate(1.5deg)} 50%{transform:translateY(-15px) rotate(-1deg)} }
        @keyframes bulba-float { 0%,100%{transform:translateY(0px) rotate(-1.5deg)} 50%{transform:translateY(-17px) rotate(1deg)} }
        @keyframes nido-glow   { 0%,100%{opacity:.6;transform:scale(1)}  50%{opacity:1;transform:scale(1.12)} }
        @keyframes pika-glow   { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:.95;transform:scale(1.1)} }
        @keyframes bulba-glow  { 0%,100%{opacity:.5;transform:scale(1)}  50%{opacity:1;transform:scale(1.08)} }
        @keyframes ring-cw     { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes ring-ccw    { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes sparkle     { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 45%,55%{opacity:1;transform:scale(1) rotate(180deg)} }
        @keyframes gnd-shadow  { 0%,100%{transform:translateX(-50%) scaleX(1);opacity:.18} 50%{transform:translateX(-50%) scaleX(.65);opacity:.07} }

        .nido-img  { animation:nido-float  3.8s ease-in-out infinite;
          filter:drop-shadow(0 0 14px rgba(216,180,254,.95)) drop-shadow(0 0 36px rgba(192,132,252,.7)) drop-shadow(0 0 75px rgba(168,85,247,.4)); }
        .pika-img  { animation:pika-float  3.2s ease-in-out infinite .5s;
          filter:drop-shadow(0 0 12px rgba(253,224,71,.95)) drop-shadow(0 0 30px rgba(250,204,21,.65)) drop-shadow(0 0 60px rgba(234,179,8,.35)); }
        .bulba-img { animation:bulba-float 4.2s ease-in-out infinite .9s;
          filter:drop-shadow(0 0 12px rgba(134,239,172,.9)) drop-shadow(0 0 30px rgba(74,222,128,.65)) drop-shadow(0 0 60px rgba(34,197,94,.35)); }

        .nido-orb  { animation:nido-glow  3.8s ease-in-out infinite; }
        .pika-orb  { animation:pika-glow  3.2s ease-in-out infinite .5s; }
        .bulba-orb { animation:bulba-glow 4.2s ease-in-out infinite .9s; }
        .ring-cw   { animation:ring-cw  14s linear infinite; }
        .ring-ccw  { animation:ring-ccw 20s linear infinite; }
        .ring-slow { animation:ring-cw  30s linear infinite; }
      `}</style>

      <div className="relative z-10 -mt-16 sm:-mt-36 md:-mt-56 w-full flex items-end justify-center">

        {/* ── Pikachu — left ── */}
        <div className="relative flex items-end justify-center flex-shrink-0"
          style={{ width: 'clamp(75px,18vw,270px)', height: 'clamp(105px,26vw,380px)', marginRight: '-1.5vw', zIndex: 8, opacity: .92 }}>
          <div className="pika-orb absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: '82%', height: '82%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(253,224,71,.2) 0%, rgba(250,204,21,.07) 55%, transparent 75%)'
            }} />
          </div>
          <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/025.png"
            alt="Pikachu" draggable={false} className="pika-img relative z-10 select-none"
            style={{ width: '80%', height: 'auto', objectFit: 'contain', marginBottom: '8%' }} />
          <div className="absolute pointer-events-none" style={{
            bottom: '2%', left: '50%', width: '36%', height: '13px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(180,140,0,.22) 0%, transparent 72%)',
            animation: 'gnd-shadow 3.2s ease-in-out infinite .5s', transform: 'translateX(-50%)'
          }} />
        </div>

        {/* ── Nidorina — center star ── */}
        <div className="relative flex items-end justify-center flex-shrink-0"
          style={{ width: 'clamp(200px,52vw,450px)', height: 'clamp(250px,60vw,550px)', zIndex: 10 }}>

          <div className="nido-orb absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: '88%', height: '88%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(216,180,254,.22) 0%, rgba(168,85,247,.09) 50%, transparent 72%)'
            }} />
          </div>
          <div className="ring-cw absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '5%' }}>
            <div style={{ width: '82%', height: '82%', borderRadius: '50%', border: '1.5px dashed rgba(216,180,254,.45)' }} />
          </div>
          <div className="ring-ccw absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '5%' }}>
            <div style={{ width: '65%', height: '65%', borderRadius: '50%', border: '1.5px dashed rgba(192,132,252,.35)' }} />
          </div>
          <div className="ring-slow absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '5%' }}>
            <div style={{ width: '98%', height: '98%', borderRadius: '50%', border: '1px solid rgba(168,85,247,.15)' }} />
          </div>

          {[
            { top: '8%', left: '14%', size: 10, delay: '0s' }, { top: '18%', right: '10%', size: 8, delay: '.6s' },
            { top: '48%', left: '5%', size: 12, delay: '1.1s' }, { top: '55%', right: '8%', size: 9, delay: '.3s' },
            { top: '28%', left: '6%', size: 7, delay: '1.6s' }, { top: '72%', right: '16%', size: 8, delay: '.9s' },
            { top: '12%', right: '28%', size: 6, delay: '2s' }, { top: '65%', left: '18%', size: 7, delay: '1.4s' },
          ].map((s, i) => (
            <div key={i} className="absolute pointer-events-none"
              style={{
                top: s.top, left: s.left, right: s.right, width: s.size, height: s.size,
                animation: `sparkle 2.4s ease-in-out infinite ${s.delay}`
              }}>
              <svg viewBox="0 0 12 12" fill="none">
                <path d="M6 0L6.8 5.2L12 6L6.8 6.8L6 12L5.2 6.8L0 6L5.2 5.2Z" fill="rgba(216,180,254,.95)" />
              </svg>
            </div>
          ))}

          <img src="https://marriland.com/wp-content/plugins/marriland-core/images/pokemon/sprites/home/full/nidorina.png"
            alt="Nidorina" draggable={false} className="nido-img relative z-10 select-none"
            style={{ width: '78%', height: 'auto', objectFit: 'contain', marginBottom: '5%' }} />

          <div className="absolute pointer-events-none" style={{
            bottom: '1%', left: '50%', width: '42%', height: '18px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(120,60,160,.25) 0%, transparent 72%)',
            animation: 'gnd-shadow 3.8s ease-in-out infinite', transform: 'translateX(-50%)'
          }} />
        </div>

        {/* ── Bulbasaur — right ── */}
        <div className="relative flex items-end justify-center flex-shrink-0"
          style={{ width: 'clamp(75px,18vw,270px)', height: 'clamp(105px,26vw,380px)', marginLeft: '-1.5vw', zIndex: 8, opacity: .92 }}>
          <div className="bulba-orb absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: '82%', height: '82%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(134,239,172,.18) 0%, rgba(74,222,128,.07) 55%, transparent 75%)'
            }} />
          </div>
          <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/001.png"
            alt="Bulbasaur" draggable={false} className="bulba-img relative z-10 select-none"
            style={{ width: '80%', height: 'auto', objectFit: 'contain', marginBottom: '8%' }} />
          <div className="absolute pointer-events-none" style={{
            bottom: '2%', left: '50%', width: '36%', height: '13px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,160,80,.2) 0%, transparent 72%)',
            animation: 'gnd-shadow 4.2s ease-in-out infinite .9s', transform: 'translateX(-50%)'
          }} />
        </div>

      </div>


      {/* Right floating — video card */}
      <div className="absolute right-6 bottom-24 z-10 hidden lg:block">
        <div className="relative w-44 h-28 rounded-2xl overflow-hidden shadow-xl cursor-pointer group">
          <img
            src="https://picsum.photos/seed/vexovideo/300/200"
            alt="Watch campaign"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 ml-0.5">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
