import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { getLoggedInUser, updateUser, updateAvatar } from '../services/auth'
import { useTheme } from '../context/ThemeContext'

export default function ProfilePage({ onUserUpdate }) {
  const navigate = useNavigate()
  const { dark } = useTheme()
  const fileInputRef = useRef(null)
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', bio: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [avatarUploading, setAvatarUploading] = useState(false)

  useEffect(() => {
    const u = getLoggedInUser()
    if (!u) { navigate('/login'); return }
    setUser(u)
    setForm({ name: u.name || '', email: u.email || '', phone: u.phone || '', location: u.location || '', bio: u.bio || '' })
  }, [navigate])

  const handleSave = (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    setTimeout(() => {
      const result = updateUser(form)
      if (result.success) {
        setUser(result.user)
        onUserUpdate?.(result.user)
        setEditing(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError(result.error)
      }
      setSaving(false)
    }, 400)
  }

  const handleCancel = () => {
    setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '', location: user.location || '', bio: user.bio || '' })
    setEditing(false)
    setError('')
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarUploading(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = updateAvatar(ev.target.result)
      if (result.success) {
        setUser(result.user)
        onUserUpdate?.(result.user)
      }
      setAvatarUploading(false)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  if (!user) return null

  const initial = (user.name || user.email || 'U')[0].toUpperCase()

  // Theme values — swap between light and dark
  const t = dark ? {
    outerBg: '#0c0c0c',
    heroBg: 'linear-gradient(180deg, #141414 0%, #0c0c0c 100%)',
    heroBorder: 'rgba(255,255,255,0.06)',
    gridLine: 'rgba(255,255,255,0.022)',
    glow: 'rgba(56,189,248,0.1)',
    textPrimary: 'white',
    textSub: 'rgba(255,255,255,0.38)',
    textLabel: 'rgba(255,255,255,0.4)',
    textMuted: 'rgba(255,255,255,0.3)',
    textIcon: 'rgba(255,255,255,0.22)',
    textValue: 'rgba(255,255,255,0.82)',
    textEmpty: 'rgba(255,255,255,0.18)',
    editBtnBg: 'rgba(255,255,255,0.04)',
    editBtnBorder: 'rgba(255,255,255,0.13)',
    cardBg: 'rgba(255,255,255,0.03)',
    cardBorder: 'rgba(255,255,255,0.08)',
    rowBorder: 'rgba(255,255,255,0.04)',
    sectionBorder: 'rgba(255,255,255,0.06)',
    cancelBg: 'transparent',
    cancelBorder: 'rgba(255,255,255,0.1)',
    cancelColor: 'rgba(255,255,255,0.45)',
    cancelHoverBg: 'rgba(255,255,255,0.05)',
    cancelHoverColor: 'white',
    avatarBg: 'linear-gradient(135deg, #1e2a3a 0%, #0f1825 100%)',
    avatarBorder: 'rgba(255,255,255,0.07)',
    cameraBorder: '#0c0c0c',
    ringPaddingBg: '#0c0c0c',
    inputBg: 'rgba(255,255,255,0.04)',
    inputBorder: 'rgba(255,255,255,0.1)',
    inputColor: 'white',
    inputPlaceholder: 'rgba(255,255,255,0.22)',
    inputFocusBorder: '#38bdf8',
    inputFocusBg: 'rgba(56,189,248,0.05)',
    inputFocusShadow: 'rgba(56,189,248,0.12)',
  } : {
    outerBg: '#f5f5f5',
    heroBg: 'linear-gradient(180deg, #ebebeb 0%, #f5f5f5 100%)',
    heroBorder: 'rgba(0,0,0,0.08)',
    gridLine: 'rgba(0,0,0,0.04)',
    glow: 'rgba(56,189,248,0.08)',
    textPrimary: '#0c0c0c',
    textSub: 'rgba(0,0,0,0.45)',
    textLabel: 'rgba(0,0,0,0.4)',
    textMuted: 'rgba(0,0,0,0.35)',
    textIcon: 'rgba(0,0,0,0.25)',
    textValue: 'rgba(0,0,0,0.85)',
    textEmpty: 'rgba(0,0,0,0.2)',
    editBtnBg: 'rgba(0,0,0,0.04)',
    editBtnBorder: 'rgba(0,0,0,0.12)',
    cardBg: 'rgba(0,0,0,0.02)',
    cardBorder: 'rgba(0,0,0,0.08)',
    rowBorder: 'rgba(0,0,0,0.05)',
    sectionBorder: 'rgba(0,0,0,0.07)',
    cancelBg: 'transparent',
    cancelBorder: 'rgba(0,0,0,0.12)',
    cancelColor: 'rgba(0,0,0,0.5)',
    cancelHoverBg: 'rgba(0,0,0,0.05)',
    cancelHoverColor: '#0c0c0c',
    avatarBg: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
    avatarBorder: 'rgba(0,0,0,0.08)',
    cameraBorder: '#f5f5f5',
    ringPaddingBg: '#f5f5f5',
    inputBg: 'rgba(0,0,0,0.04)',
    inputBorder: 'rgba(0,0,0,0.1)',
    inputColor: '#0c0c0c',
    inputPlaceholder: 'rgba(0,0,0,0.28)',
    inputFocusBorder: '#38bdf8',
    inputFocusBg: 'rgba(56,189,248,0.05)',
    inputFocusShadow: 'rgba(56,189,248,0.12)',
  }

  const fields = [
    {
      label: 'Full Name', key: 'name',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    },
    {
      label: 'Email Address', key: 'email',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>,
    },
    {
      label: 'Phone', key: 'phone',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    },
    {
      label: 'Location', key: 'location',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    },
    {
      label: 'Bio', key: 'bio', textarea: true,
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    },
  ]

  return (
    <>
      <style>{`
        @keyframes prof-ring-cw  { to { transform: rotate(360deg);  } }
        @keyframes prof-ring-ccw { to { transform: rotate(-360deg); } }
        @keyframes prof-fade-up  {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes prof-success {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.06); }
          100% { transform: scale(1);   opacity: 1; }
        }

        .prof-ring-cw  { animation: prof-ring-cw  14s linear infinite; }
        .prof-ring-ccw { animation: prof-ring-ccw 20s linear infinite; }
        .prof-fade-up  { animation: prof-fade-up 0.45s ease both; }
        .prof-fade-up-1 { animation: prof-fade-up 0.45s ease 0.08s both; }
        .prof-success   { animation: prof-success 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }

        .prof-input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          background: ${t.inputBg};
          border: 1px solid ${t.inputBorder};
          color: ${t.inputColor};
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .prof-input:focus {
          outline: none;
          border-color: ${t.inputFocusBorder};
          background: ${t.inputFocusBg};
          box-shadow: 0 0 0 3px ${t.inputFocusShadow};
        }
        .prof-input::placeholder { color: ${t.inputPlaceholder}; }

        .prof-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 560px) {
          .prof-grid { grid-template-columns: 1fr; }
        }

        .prof-avatar-wrap { cursor: pointer; }
        .prof-avatar-wrap:hover .prof-ring-ccw { opacity: 0.6; }
      `}</style>

      <div style={{ background: t.outerBg, minHeight: '100vh', fontFamily: "'Syne', sans-serif", transition: 'background 0.3s' }}>

        {/* ── Hero ─────────────────────────────── */}
        <div style={{
          background: t.heroBg,
          borderBottom: `1px solid ${t.heroBorder}`,
          padding: '52px 24px 44px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s, border-color 0.3s',
        }}>
          {/* Grid texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
          {/* Top glow */}
          <div style={{
            position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
            width: '480px', height: '220px', borderRadius: '50%', pointerEvents: 'none',
            background: `radial-gradient(ellipse, ${t.glow} 0%, transparent 70%)`,
          }} />

          <div className="prof-fade-up" style={{
            maxWidth: '680px', margin: '0 auto',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
            position: 'relative',
          }}>
            {/* Avatar with animated rings */}
            <div
              className="prof-avatar-wrap"
              style={{ position: 'relative', width: '96px', height: '96px' }}
              onClick={() => fileInputRef.current?.click()}
              title="Change profile photo"
            >
              <div className="prof-ring-cw" style={{
                position: 'absolute', inset: '-14px', borderRadius: '50%',
                border: `1px dashed ${t.ringColor ?? 'rgba(56,189,248,0.35)'}`,
              }} />
              <div className="prof-ring-ccw" style={{
                position: 'absolute', inset: '-7px', borderRadius: '50%',
                border: '1.5px solid transparent',
                background: `linear-gradient(${t.ringPaddingBg}, ${t.ringPaddingBg}) padding-box, linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #38bdf8 100%) border-box`,
              }} />
              <div style={{
                position: 'relative',
                width: '96px', height: '96px', borderRadius: '50%',
                background: t.avatarBg,
                border: `2px solid ${t.avatarBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '34px', fontWeight: 600, color: '#38bdf8',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-1px',
                overflow: 'hidden',
              }}>
                {user.avatar
                  ? <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : initial}
              </div>
              {/* Camera badge */}
              <div style={{
                position: 'absolute', bottom: '2px', right: '2px',
                width: '26px', height: '26px', borderRadius: '50%',
                background: avatarUploading ? '#0ea5e9' : '#38bdf8',
                border: `2px solid ${t.cameraBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s, transform 0.15s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}>
                {avatarUploading
                  ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: 'prof-ring-cw 0.7s linear infinite' }}><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                  : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                }
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />

            {/* Name + email */}
            <div style={{ textAlign: 'center' }}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(26px, 5vw, 40px)',
                fontWeight: 300, color: t.textPrimary, margin: 0,
                letterSpacing: '-0.3px', lineHeight: 1.1,
                transition: 'color 0.3s',
              }}>
                {user.name}
              </h1>
              <p style={{ color: t.textSub, fontSize: '12px', marginTop: '6px', letterSpacing: '0.06em', transition: 'color 0.3s' }}>
                {user.email}
              </p>
            </div>

            {/* Edit button */}
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                style={{
                  padding: '10px 28px', borderRadius: '100px',
                  border: `1px solid ${t.editBtnBorder}`,
                  background: t.editBtnBg,
                  color: t.textPrimary, fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.18em', cursor: 'pointer',
                  fontFamily: "'Syne', sans-serif",
                  transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(56,189,248,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.45)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = t.editBtnBg
                  e.currentTarget.style.borderColor = t.editBtnBorder
                }}
              >
                EDIT PROFILE
              </button>
            )}

            {/* Success toast */}
            {saved && (
              <div className="prof-success" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 18px', borderRadius: '100px',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.28)',
                color: '#4ade80', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                PROFILE UPDATED
              </div>
            )}
          </div>
        </div>

        {/* ── Content ─────────────────────────── */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px 60px' }}>

          {editing ? (
            <form onSubmit={handleSave} className="prof-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                background: t.cardBg,
                border: `1px solid ${t.cardBorder}`,
                borderRadius: '20px', padding: '28px',
                transition: 'background 0.3s, border-color 0.3s',
              }}>
                <h2 style={{
                  color: t.textLabel, fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.22em', margin: '0 0 22px', textTransform: 'uppercase',
                }}>
                  Personal Information
                </h2>

                <div className="prof-grid" style={{ marginBottom: '14px' }}>
                  {[
                    { label: 'FULL NAME', key: 'name', type: 'text', placeholder: 'Your name', autoComplete: 'name', required: true },
                    { label: 'EMAIL', key: 'email', type: 'email', placeholder: 'your@email.com', autoComplete: 'email', required: true },
                  ].map(({ label, key, type, placeholder, autoComplete, required }) => (
                    <div key={key}>
                      <label htmlFor={key} style={{ display: 'block', color: t.textMuted, fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '8px' }}>
                        {label}
                      </label>
                      <input
                        id={key} name={key}
                        className="prof-input"
                        type={type} value={form[key]} placeholder={placeholder}
                        autoComplete={autoComplete} required={required}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>

                <div className="prof-grid" style={{ marginBottom: '14px' }}>
                  {[
                    { label: 'PHONE', key: 'phone', type: 'tel', placeholder: '+1 (000) 000-0000', autoComplete: 'tel' },
                    { label: 'LOCATION', key: 'location', type: 'text', placeholder: 'City, Country', autoComplete: 'address-level2' },
                  ].map(({ label, key, type, placeholder, autoComplete }) => (
                    <div key={key}>
                      <label htmlFor={key} style={{ display: 'block', color: t.textMuted, fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '8px' }}>
                        {label}
                      </label>
                      <input
                        id={key} name={key}
                        className="prof-input"
                        type={type} value={form[key]} placeholder={placeholder}
                        autoComplete={autoComplete}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="bio" style={{ display: 'block', color: t.textMuted, fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '8px' }}>
                    BIO
                  </label>
                  <textarea
                    id="bio" name="bio"
                    className="prof-input"
                    value={form.bio}
                    placeholder="Tell us a bit about yourself…"
                    rows={3}
                    autoComplete="off"
                    style={{ resize: 'vertical' }}
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  />
                </div>
              </div>

              {error && (
                <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center', margin: 0 }}>{error}</p>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button" onClick={handleCancel}
                  style={{
                    padding: '11px 22px', borderRadius: '12px',
                    border: `1px solid ${t.cancelBorder}`,
                    background: t.cancelBg, color: t.cancelColor,
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
                    cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = t.cancelHoverBg; e.currentTarget.style.color = t.cancelHoverColor }}
                  onMouseLeave={e => { e.currentTarget.style.background = t.cancelBg; e.currentTarget.style.color = t.cancelColor }}
                >
                  CANCEL
                </button>
                <button
                  type="submit" disabled={saving}
                  style={{
                    padding: '11px 26px', borderRadius: '12px', border: 'none',
                    background: saving ? 'rgba(14,165,233,0.45)' : 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                    color: 'white', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontFamily: "'Syne', sans-serif",
                    boxShadow: saving ? 'none' : '0 4px 18px rgba(14,165,233,0.3)',
                    transition: 'all 0.2s',
                  }}
                >
                  {saving ? 'SAVING…' : 'SAVE CHANGES'}
                </button>
              </div>
            </form>
          ) : (
            <div className="prof-fade-up-1" style={{
              background: t.cardBg,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: '20px', overflow: 'hidden',
              transition: 'background 0.3s, border-color 0.3s',
            }}>
              <div style={{
                padding: '16px 24px',
                borderBottom: `1px solid ${t.sectionBorder}`,
              }}>
                <span style={{ color: t.textLabel, fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  Personal Information
                </span>
              </div>

              {fields.map(({ label, key, icon }, i) => {
                const val = user[key]
                const empty = !val
                return (
                  <div key={key} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '14px',
                    padding: '16px 24px',
                    borderBottom: i < fields.length - 1 ? `1px solid ${t.rowBorder}` : 'none',
                  }}>
                    <div style={{ color: t.textIcon, marginTop: '1px', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ color: t.textMuted, fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', margin: '0 0 4px', textTransform: 'uppercase' }}>
                        {label}
                      </p>
                      <p style={{ color: empty ? t.textEmpty : t.textValue, fontSize: '14px', margin: 0, lineHeight: 1.55 }}>
                        {empty ? '—' : val}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
