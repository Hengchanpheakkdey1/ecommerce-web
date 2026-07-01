import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { login } from '../services/auth';

const CHARIZARD = 'https://sg.portal-pokemon.com/play/resources/pokedex/img/pm/ca3db4aad5c85a525d9be86852b26db1db7a22c0.png';

function LogoIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <polygon points="18,1 34,10 34,26 18,35 2,26 2,10" fill="#38bdf8" />
      <polygon points="18,7 28,13 28,25 18,31 8,25 8,13" fill="#0ea5e9" />
      <path d="M13 18 L18 12 L23 18 L18 24 Z" fill="white" />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login({ email, password });
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 350);
  };

  return (
    <>
      <style>{`
        @keyframes charizard-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-14px) scale(1.02); }
        }
        @keyframes glow-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.1); }
        }
        @keyframes ring-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ring-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .charizard-img {
          animation: charizard-float 4.5s ease-in-out infinite;
          filter:
            drop-shadow(0 0 16px rgba(56,189,248,0.85))
            drop-shadow(0 0 38px rgba(14,165,233,0.5))
            drop-shadow(0 8px 24px rgba(0,0,0,0.18));
        }
        .glow-orb {
          animation: glow-breathe 3.5s ease-in-out infinite;
        }
        .ring-cw  { animation: ring-spin-slow 18s linear infinite; }
        .ring-ccw { animation: ring-spin-rev  24s linear infinite; }
      `}</style>

      <div className="flex min-h-screen md:h-screen w-screen overflow-hidden">

        {/* ── Left panel — Charizard ── */}
        <div
          className="hidden md:flex md:w-[45%] relative flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #f5efe4 0%, #ede5d5 50%, #f0e9dc 100%)' }}
        >
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(160,120,60,0.15) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          {/* Warm blob top-right */}
          <div className="absolute -top-16 -right-16 pointer-events-none" style={{
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)',
          }} />
          {/* Cool blob bottom-left */}
          <div className="absolute -bottom-16 -left-16 pointer-events-none" style={{
            width: '260px', height: '260px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
          }} />

          {/* Glow orb behind Charizard */}
          <div className="glow-orb absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: '400px', height: '400px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(234,179,8,0.08) 45%, transparent 72%)',
            }} />
          </div>

          {/* Spinning decorative rings */}
          <div className="ring-cw absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: '370px', height: '370px', borderRadius: '50%',
              border: '1.5px dashed rgba(180,130,60,0.3)',
            }} />
          </div>
          <div className="ring-ccw absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: '300px', height: '300px', borderRadius: '50%',
              border: '1.5px dashed rgba(56,189,248,0.35)',
            }} />
          </div>

          {/* Solid inner ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: '240px', height: '240px', borderRadius: '50%',
              border: '1px solid rgba(160,120,60,0.15)',
            }} />
          </div>

          {/* Logo */}
          <div className="absolute top-6 left-6 z-10">
            <LogoIcon />
          </div>

          {/* Charizard */}
          <div className="relative z-10 mt-6">
            <img
              src={CHARIZARD}
              alt="Mega Charizard X"
              draggable={false}
              className="charizard-img w-[310px] h-auto object-contain select-none"
            />
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-8 text-center z-10 space-y-1">
            <p className="text-[11px] font-bold tracking-[0.35em] uppercase"
              style={{ color: 'rgba(120,80,20,0.7)' }}>
              Mega Charizard X
            </p>
            <p className="text-[10px] tracking-widest uppercase"
              style={{ color: 'rgba(80,60,30,0.4)' }}>
              Power beyond limits
            </p>
          </div>

          {/* Bottom edge vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(237,229,213,0.9) 0%, transparent 100%)' }} />
        </div>

        {/* ── Right panel — form ── */}
        <div className="w-full md:w-[55%] bg-white flex flex-col overflow-y-auto">

          {/* Mobile-only brand header */}
          <div className="md:hidden flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <LogoIcon />
              <span className="text-xl font-black text-gray-900 tracking-tighter">Hanzo</span>
            </div>
            <Link to="/signup" className="text-xs font-semibold text-sky-500 hover:underline">Sign up</Link>
          </div>

          {/* Top-right link — desktop only */}
          <div className="hidden md:flex justify-end items-center px-8 pt-6 pb-2">
            <span className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-gray-900 hover:underline underline-offset-2">
                Sign up
              </Link>
            </span>
          </div>

          {/* Form — vertically centered */}
          <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-8 md:pb-12">
            <div className="w-full max-w-[420px]">

              <h1 className="text-[2rem] sm:text-[2.6rem] font-bold tracking-tight text-gray-900 mb-6 md:mb-8 leading-none">
                Sign in
              </h1>

              {/* Social */}
              <p className="text-sm text-gray-400 mb-3">Sign in with Open account</p>
              <div className="flex gap-2 sm:gap-3 mb-5 md:mb-6">
                <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all text-sm font-medium text-gray-700 cursor-pointer">
                  <svg width="17" height="17" viewBox="0 0 18 18">
                    <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4" />
                    <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01c-.72.48-1.63.76-2.7.76-2.08 0-3.84-1.4-4.47-3.28H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853" />
                    <path d="M4.51 10.53A4.8 4.8 0 0 1 4.26 9c0-.53.09-1.04.25-1.53V5.4H1.83A8 8 0 0 0 .98 9c0 1.29.31 2.51.85 3.6l2.68-2.07z" fill="#FBBC05" />
                    <path d="M8.98 3.58c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 8.98 1a8 8 0 0 0-7.15 4.4l2.68 2.07c.63-1.89 2.39-3.3 4.47-3.3v.41z" fill="#EA4335" />
                  </svg>
                  Google
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all text-sm font-medium text-gray-700 cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.182 0c.237 1.668-.588 3.315-1.716 4.368-.016.012-.032.023-.049.034C8.274 5.26 7.079 5.148 6.38 5.148c-.85 0-1.7-.37-2.3-1.03A4.35 4.35 0 0 1 3 1.52C3 .68 3.69 0 4.53 0c.394 0 .765.152 1.046.404C6.1.85 6.577 1 7 1c.42 0 .883-.148 1.404-.592C9.05.063 9.665-.115 10.207.024c.308.08.607.24.826.476.036.04.099.109.149.175zM8 6c-2.2 0-4 1.8-4 4a4 4 0 0 0 3.39 3.952C7.614 14.002 7.861 14 8 14c.124 0 .355.002.587-.04A4 4 0 0 0 12 10c0-2.2-1.8-4-4-4z" />
                  </svg>
                  Apple ID
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 whitespace-nowrap">Or continue with email address</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
                    </svg>
                  </span>
                  <input
                    type="email" placeholder="Email address"
                    value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type="password" placeholder="Password"
                    value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  />
                </div>

                {error && <p className="text-sm text-red-500 text-center pt-1">{error}</p>}

                <button
                  type="submit" disabled={loading}
                  className="w-full mt-2 py-4 text-white font-semibold text-sm rounded-2xl transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                    boxShadow: '0 4px 20px rgba(14,165,233,0.35)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 28px rgba(14,165,233,0.55)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(14,165,233,0.35)'}
                >
                  {loading ? 'Signing in…' : 'Start shopping'}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
