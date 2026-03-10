'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

// ================================================================
//  CONFIG
// ================================================================
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'teaco2025'
const MAX_KAPASITAS = 60
const SUPABASE_URL = 'https://ugobauwqlonyepldrvfn.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnb2JhdXdxbG9ueWVwbGRydmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDQwNjcsImV4cCI6MjA4NzU4MDA2N30.56Vv1HJDK5ygTUlf68BIslr-nznOb5sVUq5gjz_5CI8'

const SBH = { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
const sb = {
  async get(t, q = '') { const r = await fetch(SUPABASE_URL + '/rest/v1/' + t + '?' + q, { headers: SBH }); const b = await r.json(); if (!r.ok) throw new Error(b.message || JSON.stringify(b)); return b },
  async upsert(t, d) { const r = await fetch(SUPABASE_URL + '/rest/v1/' + t, { method: 'POST', headers: { ...SBH, 'Prefer': 'resolution=merge-duplicates,return=representation' }, body: JSON.stringify(d) }); const b = await r.json(); if (!r.ok) throw new Error(b.message || JSON.stringify(b)); return b },
  async del(t, q) { const r = await fetch(SUPABASE_URL + '/rest/v1/' + t + '?' + q, { method: 'DELETE', headers: { ...SBH, 'Prefer': 'return=minimal' } }); if (!r.ok) { const b = await r.json(); throw new Error(b.message || JSON.stringify(b)) }; return true }
}

const MEJA = [
  { id: 1, nama: 'Meja 1', area: 'Indoor', kursi: 2, x: 172, y: 18, w: 56, h: 40 },
  { id: 2, nama: 'Meja 2', area: 'Indoor', kursi: 2, x: 236, y: 18, w: 56, h: 40 },
  { id: 3, nama: 'Meja 3', area: 'Indoor', kursi: 2, x: 300, y: 18, w: 56, h: 40 },
  { id: 4, nama: 'Meja 4', area: 'Indoor', kursi: 2, x: 364, y: 18, w: 56, h: 40 },
  { id: 5, nama: 'Meja 5', area: 'Meeting Room', kursi: 2, x: 14, y: 90, w: 60, h: 46 },
  { id: 6, nama: 'Meja 6', area: 'Meeting Room', kursi: 2, x: 14, y: 146, w: 60, h: 46 },
  { id: 7, nama: 'Meja 7', area: 'Meeting Room', kursi: 2, x: 14, y: 202, w: 60, h: 46 },
  { id: 8, nama: 'Meja 8', area: 'Meeting Room', kursi: 2, x: 14, y: 258, w: 60, h: 46 },
  { id: 9, nama: 'Meja 9', area: 'Meeting Room', kursi: 2, x: 14, y: 314, w: 60, h: 46 },
  { id: 10, nama: 'Meja 10', area: 'Meeting Room', kursi: 2, x: 14, y: 370, w: 60, h: 46 },
  { id: 11, nama: 'Meja 11', area: 'Meeting Room', kursi: 2, x: 14, y: 420, w: 60, h: 40 },
  { id: 12, nama: 'Meja 12', area: 'Indoor', kursi: 4, x: 172, y: 90, w: 100, h: 66 },
  { id: 13, nama: 'Meja 13', area: 'Indoor', kursi: 4, x: 172, y: 172, w: 100, h: 66 },
  { id: 14, nama: 'Meja 14', area: 'Indoor', kursi: 4, x: 172, y: 254, w: 100, h: 66 },
  { id: 15, nama: 'Meja 15', area: 'Indoor', kursi: 4, x: 330, y: 330, w: 114, h: 52 },
  { id: 16, nama: 'Meja 16', area: 'Semi Outdoor', kursi: 4, x: 172, y: 404, w: 100, h: 46 },
  { id: 17, nama: 'Meja 17', area: 'Semi Outdoor', kursi: 4, x: 310, y: 404, w: 130, h: 46 },
  { id: 18, nama: 'Meja 18', area: 'Outdoor', kursi: 2, x: 14, y: 484, w: 70, h: 48 },
  { id: 19, nama: 'Meja 19', area: 'Outdoor', kursi: 2, x: 14, y: 542, w: 70, h: 48 },
  { id: 20, nama: 'Meja 20', area: 'Outdoor', kursi: 2, x: 14, y: 600, w: 70, h: 48 },
  { id: 21, nama: 'Meja 21', area: 'Outdoor', kursi: 2, x: 14, y: 658, w: 70, h: 48 },
  { id: 22, nama: 'Meja 22', area: 'Outdoor', kursi: 2, x: 14, y: 716, w: 70, h: 48 },
  { id: 23, nama: 'Meja 23', area: 'Outdoor', kursi: 2, x: 14, y: 774, w: 70, h: 48 },
  { id: 24, nama: 'Meja 24', area: 'Outdoor', kursi: 2, x: 14, y: 832, w: 70, h: 48 },
  { id: 25, nama: 'Meja 25', area: 'Luar Outdoor', kursi: 2, x: 364, y: 484, w: 78, h: 52 },
  { id: 26, nama: 'Meja 26', area: 'Luar Outdoor', kursi: 2, x: 364, y: 548, w: 78, h: 52 },
  { id: 27, nama: 'Meja 27', area: 'Luar Outdoor', kursi: 2, x: 364, y: 612, w: 78, h: 52 },
  { id: 28, nama: 'Meja 28', area: 'Luar Outdoor', kursi: 2, x: 364, y: 676, w: 78, h: 52 },
  { id: 29, nama: 'Meja 29', area: 'Luar Outdoor', kursi: 2, x: 364, y: 740, w: 78, h: 52 },
]

const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const HARI_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function pad(n) { return String(n).padStart(2, '0') }
function mkdk(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}` }

// ================================================================
//  LOGIN PAGE COMPONENT (full screen, shown before admin content)
// ================================================================
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const passRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    setErr('')
    if (!user.trim() || !pass.trim()) { setErr('Username dan password wajib diisi'); return }
    setLoading(true)
    // small delay for UX feel
    await new Promise(r => setTimeout(r, 500))
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('adm', '1')
      onLogin()
    } else {
      setErr('Username atau password salah')
      setPass('')
      passRef.current?.focus()
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0e0b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .login-input {
          width: 100%;
          background: #1a1814;
          border: 1px solid #2e2b25;
          color: #f0ead6;
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem;
          padding: .7rem 1rem;
          border-radius: 4px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .login-input:focus {
          border-color: #c8a96e !important;
          box-shadow: 0 0 0 3px rgba(200,169,110,0.12);
        }
        .login-btn {
          width: 100%;
          background: #c8a96e;
          color: #0f0e0b;
          border: none;
          padding: .8rem 1rem;
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem;
          font-weight: 600;
          letter-spacing: .08em;
          cursor: pointer;
          transition: background .2s, transform .1s, opacity .2s;
          text-transform: uppercase;
        }
        .login-btn:hover:not(:disabled) { background: #d4b87a; transform: translateY(-1px); }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: .6; cursor: not-allowed; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-card { animation: fadeUp .45s ease both; }
        .ornament-line {
          display: flex; align-items: center; gap: .75rem; margin: 1.4rem 0;
        }
        .ornament-line::before, .ornament-line::after {
          content: ''; flex: 1; height: 1px; background: #2e2b25;
        }
      `}</style>

      <div className="login-card" style={{
        width: '100%',
        maxWidth: 380,
        background: '#161410',
        border: '1px solid #2e2b25',
        borderRadius: '8px',
        padding: '2.5rem 2rem',
        boxShadow: '0 24px 80px rgba(0,0,0,.6)',
      }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 52, height: 52,
            borderRadius: '50%',
            background: 'rgba(200,169,110,0.1)',
            border: '1px solid rgba(200,169,110,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.4rem',
          }}>☕</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.55rem',
            color: '#c8a96e',
            margin: '0 0 .3rem',
            letterSpacing: '.02em',
          }}>Tea Co +</h1>
          <p style={{ fontSize: '.68rem', color: '#7a7060', letterSpacing: '.16em', textTransform: 'uppercase', margin: 0 }}>Admin Panel</p>
        </div>

        {/* Ornament */}
        <div className="ornament-line">
          <span style={{ fontSize: '.6rem', color: '#3a362e', letterSpacing: '.2em', textTransform: 'uppercase' }}>Masuk dengan akun admin</span>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '.68rem', color: '#7a7060', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.4rem' }}>Username</label>
            <input
              className="login-input"
              type="text"
              value={user}
              onChange={e => setUser(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="admin"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '.68rem', color: '#7a7060', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.4rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                ref={passRef}
                className="login-input"
                type={showPass ? 'text' : 'password'}
                value={pass}
                onChange={e => setPass(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                autoComplete="current-password"
                style={{ paddingRight: '2.8rem' }}
              />
              <button
                onClick={() => setShowPass(v => !v)}
                style={{
                  position: 'absolute', right: '.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#7a7060', fontSize: '.85rem', padding: '.2rem',
                  lineHeight: 1,
                }}
                tabIndex={-1}
                type="button"
              >{showPass ? '🙈' : '👁'}</button>
            </div>
          </div>

          {/* Error */}
          {err && (
            <div style={{
              background: 'rgba(139,58,58,0.2)', border: '1px solid rgba(139,58,58,0.4)',
              color: '#e07070', fontSize: '.78rem', padding: '.55rem .75rem', borderRadius: '4px',
              display: 'flex', alignItems: 'center', gap: '.5rem',
            }}>
              <span>⚠</span> {err}
            </div>
          )}

          <button
            className="login-btn"
            onClick={handleSubmit}
            disabled={loading}
            style={{ marginTop: '.3rem' }}
          >
            {loading
              ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                  <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(0,0,0,.3)', borderTopColor: '#0f0e0b', borderRadius: '50%', animation: 'spin .6s linear infinite' }} />
                  Memeriksa...
                </span>
              : 'Masuk'}
          </button>
        </div>

        {/* Back to home */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/" style={{ fontSize: '.72rem', color: '#7a7060', textDecoration: 'none', letterSpacing: '.06em', transition: 'color .15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c8a96e')}
            onMouseLeave={e => (e.currentTarget.style.color = '#7a7060')}
          >← Kembali ke halaman utama</a>
        </div>
      </div>
    </div>
  )
}

// ================================================================
//  MAIN ADMIN PAGE
// ================================================================
export default function AdminPage() {
  const today = new Date()

  // ── Auth state ─────────────────────────────────────────────────
  // null  = belum dicek (hydrating)
  // false = belum login
  // true  = sudah login
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  const [view, setView] = useState('calendar')
  const [calYear, setCalYear] = useState(today.getFullYear())
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [calData, setCalData] = useState({})
  const [calLoading, setCalLoading] = useState(true)
  const [activeDate, setActiveDate] = useState(null)
  const [resData, setResData] = useState({})
  const [totalPax, setTotalPax] = useState(0)
  const [dbStatus, setDbStatus] = useState('loading')
  const [dbLabel, setDbLabel] = useState('Menghubungkan...')

  // Reservation modal
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMejaId, setModalMejaId] = useState(null)
  const [mGuest, setMGuest] = useState('')
  const [mTime, setMTime] = useState('')
  const [mPax, setMPax] = useState('')
  const [mNote, setMNote] = useState('')
  const [mSaving, setMSaving] = useState(false)

  // Override modal
  const [overrideOpen, setOverrideOpen] = useState(false)
  const [overrideMsg, setOverrideMsg] = useState('')
  const [pendingOverride, setPendingOverride] = useState(null)

  // Toast
  const [toast, setToast] = useState({ msg: '', type: 'ok', show: false })
  const toastTimer = useRef(null)

  const showToast = useCallback((msg, type = 'ok') => {
    setToast({ msg, type, show: true })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 3200)
  }, [])

  // ── Check session on mount ─────────────────────────────────────
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('adm') === '1'
      setIsAdmin(saved)
    }
  }, [])

  // ── Check DB ───────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        setDbStatus('loading'); setDbLabel('Menghubungkan...')
        await sb.get('reservasi', 'select=id&limit=1')
        setDbStatus('ok'); setDbLabel('Terhubung')
      } catch {
        setDbStatus('err'); setDbLabel('Gagal')
      }
    })()
  }, [])

  // ── Load calendar data ─────────────────────────────────────────
  const loadCalData = useCallback(async (y, m) => {
    setCalLoading(true)
    const s = `${y}-${pad(m + 1)}-01`
    const e = `${y}-${pad(m + 1)}-${pad(new Date(y, m + 1, 0).getDate())}`
    try {
      const rows = await sb.get('reservasi', `tanggal=gte.${s}&tanggal=lte.${e}&select=tanggal,jumlah_tamu`)
      const data = {}
      rows.forEach(r => {
        if (!data[r.tanggal]) data[r.tanggal] = { count: 0, pax: 0 }
        data[r.tanggal].count++
        data[r.tanggal].pax += r.jumlah_tamu || 0
      })
      setCalData(data)
    } catch (e) { console.error(e) }
    finally { setCalLoading(false) }
  }, [])

  useEffect(() => { if (isAdmin) loadCalData(calYear, calMonth) }, [calYear, calMonth, loadCalData, isAdmin])

  const doLogout = () => {
    setIsAdmin(false)
    localStorage.removeItem('adm')
    showToast('Keluar dari mode admin')
  }

  const goFloor = async (ds) => {
    try {
      const rows = await sb.get('reservasi', `tanggal=eq.${ds}&select=*`)
      const map = {}
      rows.forEach(r => { map[r.meja_id] = r })
      const pax = rows.reduce((s, r) => s + (r.jumlah_tamu || 0), 0)
      setResData(map)
      setTotalPax(pax)
      setActiveDate(ds)
      setView('floor')
    } catch (e) { showToast('Gagal: ' + e.message, 'err') }
  }

  const openModal = (id) => {
    const r = resData[id] || {}
    setModalMejaId(id)
    setMGuest(r.nama_tamu || '')
    setMTime(r.jam ? r.jam.slice(0, 5) : '')
    setMPax(r.jumlah_tamu || '')
    setMNote(r.catatan || '')
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!mGuest.trim()) { showToast('Nama tamu wajib diisi!', 'err'); return }
    const paxBaru = parseInt(mPax) || 0
    const paxLama = (resData[modalMejaId] && resData[modalMejaId].jumlah_tamu) || 0
    const selisih = paxBaru - paxLama
    const totalSetelah = totalPax + selisih
    if (!pendingOverride && totalSetelah > MAX_KAPASITAS) {
      setOverrideMsg(`Kapasitas akan menjadi <strong>${totalSetelah}/${MAX_KAPASITAS} orang</strong> (melebihi batas).<br/><br/>Saat ini: ${totalPax} orang &bull; Tambah: ${selisih} orang &bull; Setelah: ${totalSetelah} orang<br/><br/>Lanjutkan sebagai admin?`)
      setPendingOverride({ guest: mGuest.trim(), time: mTime, pax: paxBaru, note: mNote.trim() })
      setOverrideOpen(true)
      return
    }
    await doSave(mGuest.trim(), mTime, paxBaru, mNote.trim())
  }

  const doSave = async (guest, time, pax, note) => {
    setMSaving(true)
    try {
      const payload = { meja_id: modalMejaId, tanggal: activeDate, nama_tamu: guest, jam: time || null, jumlah_tamu: pax || null, catatan: note || null }
      const saved = await sb.upsert('reservasi', payload)
      const updated = { ...resData, [modalMejaId]: saved[0] || payload }
      const paxLama = (resData[modalMejaId] && resData[modalMejaId].jumlah_tamu) || 0
      setResData(updated)
      setTotalPax(p => p - paxLama + (pax || 0))
      setModalOpen(false); setPendingOverride(null)
      showToast('✅ Reservasi tersimpan!')
    } catch (e) { showToast('Gagal simpan: ' + e.message, 'err') }
    finally { setMSaving(false) }
  }

  const doClear = async () => {
    setMSaving(true)
    try {
      const paxLama = (resData[modalMejaId] && resData[modalMejaId].jumlah_tamu) || 0
      await sb.del('reservasi', `meja_id=eq.${modalMejaId}&tanggal=eq.${activeDate}`)
      const updated = { ...resData }
      delete updated[modalMejaId]
      setResData(updated)
      setTotalPax(p => Math.max(0, p - paxLama))
      setModalOpen(false)
      showToast('Meja dikosongkan')
    } catch (e) { showToast('Gagal hapus: ' + e.message, 'err') }
    finally { setMSaving(false) }
  }

  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
  const firstDay = new Date(calYear, calMonth, 1).getDay()
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const activeMeja = MEJA.find(m => m.id === modalMejaId)
  const occCount = MEJA.filter(m => !!resData[m.id]).length
  const sisaKap = MAX_KAPASITAS - totalPax

  // ── HYDRATING — don't render anything yet ─────────────────────
  if (isAdmin === null) return null

  // ── NOT LOGGED IN — show full-screen login page ───────────────
  if (!isAdmin) {
    return <LoginPage onLogin={() => { setIsAdmin(true); loadCalData(calYear, calMonth) }} />
  }

  // ── LOGGED IN — show admin panel ──────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: '#0f0e0b', color: '#f0ead6', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        input { background: #1a1814 !important; border: 1px solid #2e2b25; color: #f0ead6; font-family: 'DM Sans',sans-serif; font-size: .88rem; padding: .5rem .75rem; border-radius: 4px; outline: none; transition: border-color .15s; width: 100%; margin-bottom: .8rem; }
        input:focus { border-color: #c8a96e !important; }
        .cal-cell-hover:hover { background: rgba(200,169,110,0.07) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100%{opacity:1;}50%{opacity:.3;} }
        .db-blink { animation: blink 1s infinite; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(200,169,110,.2); border-radius: 3px; }
      `}</style>

      {/* HEADER */}
      <header style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #2e2b25', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.7rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.1rem,3vw,1.65rem)', color: '#c8a96e', margin: 0 }}>Reservasi Meja</h1>
          <p style={{ fontSize: '.64rem', color: '#7a7060', letterSpacing: '.14em', textTransform: 'uppercase', marginTop: '.2rem' }}>Admin Panel · Ramadan 1446 H</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexWrap: 'wrap' }}>
          {/* DB Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.68rem', color: '#7a7060', background: '#221f1a', border: '1px solid #2e2b25', padding: '.3rem .68rem', borderRadius: '20px' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: dbStatus === 'ok' ? '#5cb85c' : dbStatus === 'err' ? '#8b3a3a' : '#c8a96e', boxShadow: dbStatus === 'ok' ? '0 0 6px rgba(92,184,92,.5)' : 'none' }} className={dbStatus === 'loading' ? 'db-blink' : ''} />
            {dbLabel}
          </div>
          <a href="/" style={{ background: '#221f1a', border: '1px solid #2e2b25', color: '#7a7060', padding: '.3rem .75rem', borderRadius: '20px', cursor: 'pointer', fontSize: '.67rem', textDecoration: 'none' }}>← Home</a>
          <span style={{ background: 'rgba(200,169,110,.12)', border: '1px solid rgba(200,169,110,.3)', color: '#c8a96e', padding: '.3rem .75rem', borderRadius: '20px', fontSize: '.67rem' }}>⚙ Admin ✓</span>
          <button onClick={doLogout} style={{ background: '#221f1a', border: '1px solid #2e2b25', color: '#7a7060', padding: '.3rem .75rem', borderRadius: '20px', cursor: 'pointer', fontSize: '.67rem', fontFamily: 'DM Sans' }}>Keluar</button>
        </div>
      </header>

      {/* ============ CALENDAR VIEW ============ */}
      {view === 'calendar' && (
        <div style={{ maxWidth: 840, margin: '2rem auto', padding: '0 1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#c8a96e', margin: 0 }}>{BULAN[calMonth]} {calYear}</h2>
            <div style={{ display: 'flex', gap: '.4rem' }}>
              {[['‹', () => { if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) } else setCalMonth(m => m - 1) }], ['Hari Ini', () => { setCalYear(today.getFullYear()); setCalMonth(today.getMonth()) }], ['›', () => { if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) } else setCalMonth(m => m + 1) }]].map(([label, fn]) => (
                <button key={label} onClick={fn} style={{ background: '#221f1a', border: '1px solid #2e2b25', color: '#f0ead6', padding: '.4rem .85rem', borderRadius: '3px', cursor: 'pointer', fontSize: '.85rem', fontFamily: 'DM Sans' }}>{label}</button>
              ))}
            </div>
          </div>

          <div style={{ background: '#1a1814', border: '1px solid #2e2b25', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid #2e2b25' }}>
              {HARI_SHORT.map(h => <div key={h} style={{ textAlign: 'center', padding: '.55rem', fontSize: '.64rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7a7060' }}>{h}</div>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
              {cells.map((day, i) => {
                if (!day) return <div key={i} style={{ borderRight: i % 7 !== 6 ? '1px solid #2e2b25' : 'none', borderBottom: '1px solid #2e2b25', minHeight: 90, background: 'rgba(0,0,0,.12)' }} />
                const dstr = mkdk(calYear, calMonth, day)
                const isPast = new Date(calYear, calMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
                const data = calData[dstr] || { count: 0, pax: 0 }
                const isFull = data.pax >= MAX_KAPASITAS
                const isAlmost = data.pax >= MAX_KAPASITAS * 0.8 && !isFull
                const isToday = dstr === todayStr
                let bg = 'transparent'
                if (isFull) bg = 'rgba(200,150,50,0.15)'
                else if (isAlmost) bg = 'rgba(200,150,50,0.1)'
                else if (data.count) bg = 'rgba(139,58,58,0.07)'
                return (
                  <div key={i}
                    onClick={() => !isPast && goFloor(dstr)}
                    className={!isPast ? 'cal-cell-hover' : ''}
                    style={{ borderRight: i % 7 !== 6 ? '1px solid #2e2b25' : 'none', borderBottom: '1px solid #2e2b25', minHeight: 90, padding: '.45rem .55rem', cursor: isPast ? 'default' : 'pointer', opacity: isPast ? .35 : 1, background: bg, transition: 'background .15s', outline: isToday ? '2px solid #c8a96e' : 'none', outlineOffset: -2 }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '.88rem', color: isFull ? '#d4a84a' : isToday ? '#c8a96e' : '#f0ead6', fontWeight: isToday ? 700 : 400 }}>{day}</div>
                    {data.count > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: '.3rem' }}>
                        {Array.from({ length: Math.min(data.count, 9) }).map((_, j) => <div key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: isFull ? '#e07070' : '#8b3a3a', opacity: .85 }} />)}
                      </div>
                    )}
                    <div style={{ fontSize: '.6rem', color: isFull ? '#e07070' : isAlmost ? '#d4a84a' : '#7a7060', marginTop: '.25rem', lineHeight: 1.3, fontWeight: isFull ? 600 : 400 }}>
                      {isFull ? `⚠️ PENUH\n${data.pax}/${MAX_KAPASITAS} org` : isAlmost ? `⚠️ ${data.pax}/${MAX_KAPASITAS}\nHampir penuh` : data.count ? `${data.count} reservasi\n${data.pax} orang` : ''}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '.7rem', color: '#7a7060', marginTop: '1rem', letterSpacing: '.08em' }}>
            Admin: Bisa klik tanggal penuh untuk override
          </p>
        </div>
      )}

      {/* ============ FLOOR VIEW ============ */}
      {view === 'floor' && activeDate && (
        <div style={{ maxWidth: 840, margin: '2rem auto', padding: '0 1.2rem' }}>
          {/* Back button */}
          <div style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => { setView('calendar'); setActiveDate(null) }} style={{ background: '#221f1a', border: '1px solid #2e2b25', color: '#c8a96e', padding: '.4rem .85rem', borderRadius: '3px', cursor: 'pointer', fontSize: '.82rem', fontFamily: 'DM Sans' }}>← Kembali</button>
            <div>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: '#c8a96e' }}>
                {activeDate.split('-').reverse().map((v, i) => i === 1 ? BULAN[+v - 1] : v).join(' ')}
              </span>
              <span style={{ fontSize: '.7rem', color: '#7a7060', marginLeft: '.75rem' }}>
                {occCount}/{MEJA.length} meja · {totalPax}/{MAX_KAPASITAS} orang {sisaKap < 0 ? `(+${Math.abs(sisaKap)} override)` : `(sisa ${sisaKap})`}
              </span>
            </div>
          </div>

          {/* Floor map - simple table grid */}
          <div style={{ background: '#1a1814', border: '1px solid #2e2b25', borderRadius: '6px', padding: '1rem', overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.6rem' }}>
              {MEJA.map(m => {
                const booked = !!resData[m.id]
                return (
                  <div
                    key={m.id}
                    onClick={() => openModal(m.id)}
                    style={{
                      background: booked ? 'rgba(139,58,58,0.3)' : 'rgba(200,169,110,0.06)',
                      border: `1px solid ${booked ? 'rgba(139,58,58,0.6)' : '#2e2b25'}`,
                      borderRadius: '4px',
                      padding: '.65rem .75rem',
                      cursor: 'pointer',
                      transition: 'all .15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8a96e'; e.currentTarget.style.background = booked ? 'rgba(139,58,58,0.4)' : 'rgba(200,169,110,0.12)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = booked ? 'rgba(139,58,58,0.6)' : '#2e2b25'; e.currentTarget.style.background = booked ? 'rgba(139,58,58,0.3)' : 'rgba(200,169,110,0.06)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '.72rem', color: '#c8a96e', fontWeight: 600 }}>{m.nama}</span>
                      <span style={{ fontSize: '.6rem', color: '#7a7060' }}>{m.kursi} kursi</span>
                    </div>
                    <div style={{ fontSize: '.62rem', color: '#7a7060', marginTop: '.2rem' }}>{m.area}</div>
                    {booked && resData[m.id] && (
                      <div style={{ marginTop: '.4rem', paddingTop: '.4rem', borderTop: '1px solid rgba(139,58,58,0.4)' }}>
                        <div style={{ fontSize: '.72rem', color: '#f0ead6', fontWeight: 500 }}>{resData[m.id].nama_tamu}</div>
                        {resData[m.id].jam && <div style={{ fontSize: '.62rem', color: '#c8a96e' }}>{resData[m.id].jam.slice(0, 5)}</div>}
                        {resData[m.id].jumlah_tamu && <div style={{ fontSize: '.62rem', color: '#7a7060' }}>{resData[m.id].jumlah_tamu} orang</div>}
                      </div>
                    )}
                    {!booked && <div style={{ fontSize: '.66rem', color: '#3a362e', marginTop: '.35rem' }}>Kosong — klik untuk isi</div>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============ RESERVATION MODAL ============ */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={e => e.target === e.currentTarget && setModalOpen(false)}>
          <div style={{ background: '#161410', border: '1px solid #2e2b25', borderRadius: '8px', padding: '1.5rem', width: '100%', maxWidth: 380, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", color: '#c8a96e', margin: 0, fontSize: '1.1rem' }}>
                {activeMeja?.nama} <span style={{ fontSize: '.72rem', color: '#7a7060', fontFamily: 'DM Sans' }}>· {activeMeja?.area}</span>
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#7a7060', cursor: 'pointer', fontSize: '1.2rem', padding: '.2rem' }}>✕</button>
            </div>
            {[['Nama Tamu *', mGuest, setMGuest, 'text', 'Nama tamu'], ['Jam', mTime, setMTime, 'time', ''], ['Jumlah Orang', mPax, setMPax, 'number', ''], ['Catatan', mNote, setMNote, 'text', '']].map(([label, val, setter, type, ph]) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: '.65rem', color: '#7a7060', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.3rem' }}>{label}</label>
                <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={ph} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
              <button onClick={handleSave} disabled={mSaving} style={{ flex: 1, background: '#c8a96e', color: '#0f0e0b', border: 'none', padding: '.65rem', borderRadius: '4px', cursor: mSaving ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans', fontWeight: 600, fontSize: '.82rem', opacity: mSaving ? .6 : 1 }}>
                {mSaving ? '...' : 'Simpan'}
              </button>
              {resData[modalMejaId] && (
                <button onClick={doClear} disabled={mSaving} style={{ background: 'rgba(139,58,58,0.3)', color: '#e07070', border: '1px solid rgba(139,58,58,0.5)', padding: '.65rem .9rem', borderRadius: '4px', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.82rem' }}>Kosongkan</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============ OVERRIDE MODAL ============ */}
      {overrideOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.8)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#161410', border: '1px solid rgba(200,169,110,.3)', borderRadius: '8px', padding: '1.5rem', width: '100%', maxWidth: 360 }}>
            <h3 style={{ color: '#d4a84a', fontFamily: "'Playfair Display',serif", marginTop: 0 }}>⚠ Override Kapasitas</h3>
            <p style={{ fontSize: '.82rem', color: '#b0a080', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: overrideMsg }} />
            <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
              <button onClick={async () => { setOverrideOpen(false); await doSave(pendingOverride.guest, pendingOverride.time, pendingOverride.pax, pendingOverride.note) }} style={{ flex: 1, background: 'rgba(200,169,110,.15)', color: '#c8a96e', border: '1px solid rgba(200,169,110,.3)', padding: '.6rem', borderRadius: '4px', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.82rem' }}>Ya, Lanjutkan</button>
              <button onClick={() => { setOverrideOpen(false); setPendingOverride(null) }} style={{ flex: 1, background: '#221f1a', color: '#7a7060', border: '1px solid #2e2b25', padding: '.6rem', borderRadius: '4px', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.82rem' }}>Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* ============ TOAST ============ */}
      {toast.show && (
        <div style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: toast.type === 'err' ? '#3a1a1a' : '#1e1c17', border: `1px solid ${toast.type === 'err' ? '#8b3a3a' : '#2e2b25'}`, color: toast.type === 'err' ? '#e07070' : '#c8a96e', padding: '.6rem 1.2rem', borderRadius: '20px', fontSize: '.78rem', zIndex: 999, whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,.5)' }}>
          {toast.msg}
        </div>
      )}
    </div>
  )
                      }
