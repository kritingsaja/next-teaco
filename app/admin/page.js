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
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const HARI_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function pad(n) { return String(n).padStart(2, '0') }
function mkdk(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}` }
function dispDate(s) { const [y, m, d] = s.split('-'); return `${+d} ${BULAN[+m - 1]} ${y}` }

export default function AdminPage() {
  const today = new Date()
  const [isAdmin, setIsAdmin] = useState(false)
  const [view, setView] = useState('calendar') // 'calendar' | 'floor'
  const [calYear, setCalYear] = useState(today.getFullYear())
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [calData, setCalData] = useState({})
  const [calLoading, setCalLoading] = useState(true)
  const [activeDate, setActiveDate] = useState(null)
  const [resData, setResData] = useState({})
  const [totalPax, setTotalPax] = useState(0)
  const [dbStatus, setDbStatus] = useState('loading')
  const [dbLabel, setDbLabel] = useState('Menghubungkan...')

  // Login modal
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginUser, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginErr, setLoginErr] = useState('')

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

  // Check session
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('adm') === '1') setIsAdmin(true)
  }, [])

  // Check DB
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

  // Load calendar data
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

  useEffect(() => { loadCalData(calYear, calMonth) }, [calYear, calMonth, loadCalData])

  const submitLogin = () => {
    if (!loginUser || !loginPass) { setLoginErr('Isi username dan password!'); return }
    if (loginUser === ADMIN_USER && loginPass === ADMIN_PASS) {
      setIsAdmin(true)
      localStorage.setItem('adm', '1')
      setLoginOpen(false)
      setLoginUser(''); setLoginPass(''); setLoginErr('')
      showToast('✅ Login admin berhasil!')
    } else {
      setLoginErr('❌ Username atau password salah')
      setLoginPass('')
    }
  }

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
      if (!isAdmin && pax >= MAX_KAPASITAS) { showToast(`🔴 Tanggal ini sudah penuh! (${pax}/${MAX_KAPASITAS} orang)`, 'err'); return }
      setResData(map)
      setTotalPax(pax)
      setActiveDate(ds)
      setView('floor')
    } catch (e) { showToast('Gagal: ' + e.message, 'err') }
  }

  const openModal = (id) => {
    if (!isAdmin) return
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
        .table-hover:hover .tbody-rect { filter: brightness(1.3); }
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
          <a href="/" style={{ background: '#221f1a', border: '1px solid #2e2b25', color: '#7a7060', padding: '.3rem .75rem', borderRadius: '20px', cursor: 'pointer', fontSize: '.67rem', textDecoration: 'none', transition: 'all .15s' }}>← Home</a>
          {!isAdmin ? (
            <button onClick={() => setLoginOpen(true)} style={{ background: '#221f1a', border: '1px solid #2e2b25', color: '#7a7060', padding: '.3rem .75rem', borderRadius: '20px', cursor: 'pointer', fontSize: '.67rem', fontFamily: 'DM Sans', transition: 'all .15s' }}>⚙ Admin Login</button>
          ) : (
            <span style={{ background: 'rgba(200,169,110,.12)', border: '1px solid rgba(200,169,110,.3)', color: '#c8a96e', padding: '.3rem .75rem', borderRadius: '20px', fontSize: '.67rem' }}>⚙ Admin ✓</span>
          )}
        </div>
      </header>

      {/* ============ CALENDAR VIEW ============ */}
      {view === 'calendar' && (
        <div style={{ maxWidth: 840, margin: '2rem auto', padding: '0 1.2rem' }}>
          {/* Cal Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#c8a96e', margin: 0 }}>{BULAN[calMonth]} {calYear}</h2>
            <div style={{ display: 'flex', gap: '.4rem' }}>
              {[['‹', () => { if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) } else setCalMonth(m => m - 1) }], ['Hari Ini', () => { setCalYear(today.getFullYear()); setCalMonth(today.getMonth()) }], ['›', () => { if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) } else setCalMonth(m => m + 1) }]].map(([label, fn]) => (
                <button key={label} onClick={fn} style={{ background: '#221f1a', border: '1px solid #2e2b25', color: '#f0ead6', padding: '.4rem .85rem', borderRadius: '3px', cursor: 'pointer', fontSize: '.85rem', fontFamily: 'DM Sans', transition: 'border-color .15s' }}>{label}</button>
              ))}
            </div>
          </div>

          {/* Grid */}
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
                if (isFull) bg = isAdmin ? 'rgba(200,150,50,0.15)' : 'rgba(139,58,58,0.25)'
                else if (isAlmost) bg = 'rgba(200,150,50,0.1)'
                else if (data.count) bg = 'rgba(139,58,58,0.07)'
                return (
                  <div key={i}
                    onClick={() => !isPast && goFloor(dstr)}
                    className={!isPast ? 'cal-cell-hover' : ''}
                    style={{ borderRight: i % 7 !== 6 ? '1px solid #2e2b25' : 'none', borderBottom: '1px solid #2e2b25', minHeight: 90, padding: '.45rem .55rem', cursor: isPast ? 'default' : 'pointer', opacity: isPast ? .35 : 1, background: bg, transition: 'background .15s', outline: isToday ? '2px solid #c8a96e' : 'none', outlineOffset: -2 }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '.88rem', color: isFull ? (isAdmin ? '#d4a84a' : '#e07070') : isAlmost ? '#d4a84a' : isToday ? '#c8a96e' : '#f0ead6', fontWeight: isToday ? 700 : 400 }}>{day}</div>
                    {data.count > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: '.3rem' }}>
                        {Array.from({ length: Math.min(data.count, 9) }).map((_, j) => <div key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: isFull ? '#e07070' : '#8b3a3a', opacity: .85 }} />)}
                      </div>
                    )}
                    <div style={{ fontSize: '.6rem', color: isFull ? '#e07070' : isAlmost ? '#d4a84a' : '#7a7060', marginTop: '.25rem', lineHeight: 1.3, fontWeight: isFull ? 600 : 400 }}>
                      {isFull ? `${isAdmin ? '⚠️' : '🔴'} PENUH\n${data.pax}/${MAX_KAPASITAS} org` : isAlmost ? `⚠️ ${data.pax}/${MAX_KAPASITAS}\nHampir penuh` : data.count ? `${data.count} reservasi\n${data.pax} orang` : ''}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '.7rem', color: '#7a7060', marginTop: '1rem', letterSpacing: '.08em' }}>
            {isAdmin ? 'Admin: Bisa klik tanggal penuh untuk override' : 'Klik tanggal untuk melihat denah meja'}
          </p>
        </div>
      )}

      {/* ============ FLOOR VIEW ============ */}
      {view === 'floor' && (
        <div>
          {/* Banner */}
          {(isAdmin || sisaKap <= 0 || sisaKap < 10) && (
            <div style={{ padding: '.45rem 1.5rem', fontSize: '.72rem', display: 'flex', alignItems: 'center', gap: '.5rem', background: totalPax > MAX_KAPASITAS ? 'rgba(200,169,110,.15)' : sisaKap <= 0 ? 'rgba(139,58,58,.2)' : 'rgba(200,169,110,.1)', borderBottom: '1px solid rgba(200,169,110,.2)', color: totalPax > MAX_KAPASITAS ? '#c8a96e' : sisaKap <= 0 ? '#e07070' : '#c8a96e' }}>
              {isAdmin ? (totalPax > MAX_KAPASITAS ? `⚠️ OVERRIDE AKTIF — Sudah ${totalPax}/${MAX_KAPASITAS} orang` : `✏️ Mode Edit Aktif — klik meja untuk ubah reservasi`) : (sisaKap <= 0 ? '🔴 SUDAH PENUH! Hubungi admin untuk waiting list' : `⚠️ Sisa ${sisaKap} orang lagi sampai penuh!`)}
            </div>
          )}

          {/* Floor Header */}
          <div style={{ padding: '.8rem 1.5rem', borderBottom: '1px solid #2e2b25', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.8rem', background: '#1a1814' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.9rem' }}>
              <button onClick={() => { setView('calendar'); setActiveDate(null); loadCalData(calYear, calMonth) }} style={{ background: '#221f1a', border: '1px solid #2e2b25', color: '#c8a96e', padding: '.36rem .88rem', borderRadius: '3px', cursor: 'pointer', fontSize: '.8rem', fontFamily: 'DM Sans' }}>← Kalender</button>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: '#c8a96e' }}>{activeDate && dispDate(activeDate)}</div>
                <div style={{ fontSize: '.65rem', color: '#7a7060', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '.1rem' }}>{activeDate && HARI[new Date(activeDate).getDay()]}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.9rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '.9rem' }}>
                {[['#c8a96e', 'Tersedia'], ['#8b3a3a', 'Terisi']].map(([c, l]) => <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '.38rem', fontSize: '.72rem', color: '#7a7060' }}><div style={{ width: 9, height: 9, borderRadius: 2, background: c }} />{l}</div>)}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '1.5rem', padding: '.7rem 1.5rem', borderBottom: '1px solid #2e2b25', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              [MEJA.length, 'Total Meja'],
              [MEJA.length - occCount, 'Tersedia', sisaKap < 10 ? '#e07070' : '#c8a96e'],
              [occCount, 'Terisi', '#e07070'],
              [`${totalPax}/${MAX_KAPASITAS}`, 'Kapasitas', totalPax >= MAX_KAPASITAS ? '#e07070' : '#c8a96e'],
            ].map(([val, lbl, clr], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {i > 0 && <div style={{ width: 1, height: 28, background: '#2e2b25' }} />}
                <div>
                  <div style={{ fontSize: '1.4rem', fontFamily: "'Playfair Display',serif", color: clr || '#c8a96e', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: '.62rem', color: '#7a7060', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '.1rem' }}>{lbl}</div>
                </div>
              </div>
            ))}
          </div>

          <main style={{ padding: '1.2rem 1.5rem' }}>
            {/* Floor Plan */}
            <div style={{ fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a7060', marginBottom: '.8rem', display: 'flex', alignItems: 'center', gap: '.6rem' }}>
              Denah Lantai <div style={{ flex: 1, height: 1, background: '#2e2b25' }} />
            </div>
            <div style={{ background: '#1a1814', border: '1px solid #2e2b25', borderRadius: 4, padding: '.8rem', overflowX: 'auto' }}>
              <FloorSVG meja={MEJA} resData={resData} isAdmin={isAdmin} onMejaClick={openModal} />
            </div>

            {/* Table List */}
            <div style={{ fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a7060', margin: '1.2rem 0 .8rem', display: 'flex', alignItems: 'center', gap: '.6rem' }}>
              Daftar Meja <div style={{ flex: 1, height: 1, background: '#2e2b25' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '.55rem' }}>
              {MEJA.map(m => {
                const r = resData[m.id], occ = !!r
                return (
                  <div key={m.id} onClick={() => isAdmin && openModal(m.id)}
                    style={{ background: '#221f1a', border: '1px solid #2e2b25', borderLeft: `3px solid ${occ ? '#8b3a3a' : '#c8a96e'}`, borderRadius: 3, padding: '.72rem .88rem', cursor: isAdmin ? 'pointer' : 'default', transition: 'border-color .15s' }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '.86rem', marginBottom: '.1rem' }}>{m.nama}</div>
                    <div style={{ fontSize: '.66rem', color: '#7a7060' }}>{m.kursi} kursi · {m.area}</div>
                    {r && <div style={{ fontSize: '.72rem', marginTop: '.26rem' }}>👤 {r.nama_tamu}{r.jumlah_tamu ? ` (${r.jumlah_tamu} org)` : ''}</div>}
                    {r?.jam && <div style={{ fontSize: '.64rem', color: '#7a7060', marginTop: '.04rem' }}>🕐 {r.jam.slice(0, 5)}{r.catatan ? ` · ${r.catatan}` : ''}</div>}
                    <div style={{ display: 'inline-block', marginTop: '.3rem', fontSize: '.59rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.12rem .36rem', borderRadius: 2, background: occ ? 'rgba(139,58,58,.2)' : 'rgba(200,169,110,.13)', color: occ ? '#e07070' : '#c8a96e' }}>{occ ? 'Terisi' : 'Tersedia'}</div>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      )}

      {/* ============ LOGIN MODAL ============ */}
      {loginOpen && (
        <div onClick={() => setLoginOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#1a1814', border: '1px solid #2e2b25', borderRadius: 10, padding: '2.2rem 2rem', width: '90%', maxWidth: 320, textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', color: '#c8a96e', marginBottom: '.25rem' }}>Login Admin</h2>
            <p style={{ fontSize: '.65rem', color: '#7a7060', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '1.6rem' }}>Masukkan kredensial admin</p>
            {[['Username', loginUser, setLoginUser, 'text', false], ['Password', loginPass, setLoginPass, 'password', true]].map(([lbl, val, set, type, isLast]) => (
              <div key={lbl} style={{ textAlign: 'left', marginBottom: '.85rem' }}>
                <label style={{ display: 'block', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a7060', marginBottom: '.28rem' }}>{lbl}</label>
                <input type={type} value={val} onChange={e => set(e.target.value)} onKeyDown={e => isLast && e.key === 'Enter' && submitLogin()} placeholder={`${lbl}...`} autoComplete="off" />
              </div>
            ))}
            <button onClick={submitLogin} style={{ width: '100%', background: '#c8a96e', color: '#0f0e0b', border: 'none', padding: '.65rem', borderRadius: 4, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.88rem', fontWeight: 700 }}>Masuk sebagai Admin</button>
            {loginErr && <div style={{ color: '#e07070', fontSize: '.75rem', marginTop: '.7rem' }}>{loginErr}</div>}
            <span onClick={() => setLoginOpen(false)} style={{ display: 'block', marginTop: '1rem', fontSize: '.7rem', color: '#7a7060', cursor: 'pointer', textDecoration: 'underline' }}>Batal</span>
          </div>
        </div>
      )}

      {/* ============ RESERVATION MODAL ============ */}
      {modalOpen && activeMeja && (
        <div onClick={() => setModalOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.82)', zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#221f1a', border: '1px solid #2e2b25', borderRadius: 6, padding: '1.8rem', width: '90%', maxWidth: 390 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: '#c8a96e', marginBottom: '1.2rem' }}>{activeMeja.nama} · {activeMeja.kursi} kursi · {activeMeja.area}</h2>
            {[['Nama Tamu', mGuest, setMGuest, 'text', 'Nama pemesan...'], ['Jam Reservasi', mTime, setMTime, 'time', ''], ['Jumlah Tamu', mPax, setMPax, 'number', 'Jumlah orang'], ['Catatan', mNote, setMNote, 'text', 'Catatan khusus (opsional)']].map(([lbl, val, set, type, ph]) => (
              <div key={lbl}>
                <label style={{ display: 'block', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a7060', marginBottom: '.26rem' }}>{lbl}</label>
                <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={ph} min={type === 'number' ? 1 : undefined} max={type === 'number' ? 30 : undefined} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '.55rem', marginTop: '.2rem' }}>
              <button onClick={handleSave} disabled={mSaving} style={{ flex: 1, padding: '.56rem', border: 'none', borderRadius: 3, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.78rem', background: '#c8a96e', color: '#0f0e0b', fontWeight: 600, opacity: mSaving ? .6 : 1 }}>{mSaving ? 'Menyimpan...' : 'Simpan'}</button>
              <button onClick={doClear} disabled={mSaving} style={{ flex: 1, padding: '.56rem', border: 'none', borderRadius: 3, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.78rem', background: '#8b3a3a', color: '#f0ead6', opacity: mSaving ? .6 : 1 }}>{mSaving ? 'Menghapus...' : 'Kosongkan'}</button>
              <button onClick={() => setModalOpen(false)} style={{ flex: '0 0 auto', padding: '.56rem .85rem', border: '1px solid #2e2b25', borderRadius: 3, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.78rem', background: '#1a1814', color: '#7a7060' }}>Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* ============ OVERRIDE MODAL ============ */}
      {overrideOpen && (
        <div onClick={() => { setOverrideOpen(false); setPendingOverride(null) }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.82)', zIndex: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'rgba(139,58,58,.15)', border: '2px solid #d4a84a', borderRadius: 6, padding: '1.8rem', width: '90%', maxWidth: 390 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: '#d4a84a', marginBottom: '1rem' }}>⚠️ Override Kapasitas</h2>
            <p style={{ fontSize: '.75rem', color: '#f0ead6', marginBottom: '1.2rem', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: overrideMsg }} />
            <div style={{ display: 'flex', gap: '.55rem' }}>
              <button onClick={async () => { setOverrideOpen(false); if (pendingOverride) { await doSave(pendingOverride.guest, pendingOverride.time, pendingOverride.pax, pendingOverride.note); setPendingOverride(null) } }} style={{ flex: 1, padding: '.56rem', border: 'none', borderRadius: 3, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.78rem', background: '#c8a96e', color: '#0f0e0b', fontWeight: 600 }}>Ya, Lanjutkan</button>
              <button onClick={() => { setOverrideOpen(false); setPendingOverride(null) }} style={{ flex: '0 0 auto', padding: '.56rem .85rem', border: '1px solid #2e2b25', borderRadius: 3, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.78rem', background: '#1a1814', color: '#7a7060' }}>Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: '#221f1a', border: `1px solid #2e2b25`, borderLeft: `3px solid ${toast.type === 'err' ? '#8b3a3a' : '#c8a96e'}`, padding: '.62rem 1.1rem', borderRadius: 4, fontSize: '.78rem', color: '#f0ead6', zIndex: 700, maxWidth: 300, transition: 'all .25s', transform: toast.show ? 'translateY(0)' : 'translateY(10px)', opacity: toast.show ? 1 : 0, pointerEvents: 'none' }}>
        {toast.msg}
      </div>
    </div>
  )
}

// ============ FLOOR SVG COMPONENT ============
function FloorSVG({ meja, resData, isAdmin, onMejaClick }) {
  return (
    <svg viewBox="0 0 460 1000" width="460" height="1000" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }}>
      {/* Areas */}
      <rect x="158" y="4" width="296" height="460" fill="none" stroke="#6a6050" strokeWidth="4" />
      <rect x="158" y="2" width="90" height="8" rx="1" fill="#c8a96e" opacity=".8" />
      <text x="203" y="1" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#c8a96e" textAnchor="middle" letterSpacing="1">PINTU MASUK</text>
      <text x="370" y="280" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#6a6050" textAnchor="middle" letterSpacing="2">INDOOR</text>
      <rect x="4" y="76" width="158" height="388" fill="rgba(60,110,160,0.06)" stroke="#5a8aaa" strokeWidth="4" />
      <text x="83" y="450" fontFamily="DM Sans,sans-serif" fontSize="8" fill="#5a9aba" textAnchor="middle" letterSpacing="1">MEETING ROOM</text>
      <rect x="158" y="390" width="296" height="74" fill="rgba(80,80,60,0.05)" stroke="#6a6050" strokeWidth="2" />
      <text x="306" y="433" fontFamily="DM Sans,sans-serif" fontSize="8" fill="#6a6050" textAnchor="middle" letterSpacing="1">SEMI OUTDOOR</text>
      <rect x="4" y="464" width="450" height="5" fill="#6a6050" />
      <rect x="170" y="459" width="80" height="14" rx="2" fill="#c8a96e" opacity=".75" />
      <text x="210" y="458" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#c8a96e" textAnchor="middle" letterSpacing="1">PINTU</text>
      <rect x="4" y="470" width="450" height="522" fill="none" stroke="#6a6050" strokeWidth="4" />
      <text x="230" y="750" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#6a6050" textAnchor="middle" letterSpacing="2">OUTDOOR / TERAS</text>
      <rect x="354" y="478" width="92" height="506" fill="none" stroke="#6a6050" strokeWidth="2.5" />
      <text x="400" y="968" fontFamily="DM Sans,sans-serif" fontSize="7.5" fill="#6a6050" textAnchor="middle" letterSpacing="1">LUAR</text>

      {/* Tables */}
      {meja.map(m => {
        const r = resData[m.id], occ = !!r
        const c = occ ? '#8b3a3a' : '#c8a96e'
        const f = occ ? 'rgba(139,58,58,0.18)' : 'rgba(200,169,110,0.12)'
        const sps = m.kursi <= 2 ? 1 : 2
        const cW = 9, cH = 6, pad = 4
        const chairs = []
        for (let i = 0; i < sps; i++) {
          const cx = m.x + (i + 1) * m.w / (sps + 1) - cW / 2
          chairs.push(<rect key={`ct${i}`} x={cx} y={m.y - cH - pad} width={cW} height={cH} rx="1.5" fill={c} opacity=".42" />)
          chairs.push(<rect key={`cb${i}`} x={cx} y={m.y + m.h + pad} width={cW} height={cH} rx="1.5" fill={c} opacity=".42" />)
        }
        if (m.kursi >= 4) {
          chairs.push(<rect key="cl" x={m.x - cH - pad} y={m.y + m.h / 2 - cW / 2} width={cH} height={cW} rx="1.5" fill={c} opacity=".42" />)
          chairs.push(<rect key="cr" x={m.x + m.w + pad} y={m.y + m.h / 2 - cW / 2} width={cH} height={cW} rx="1.5" fill={c} opacity=".42" />)
        }
        const guestShort = r?.nama_tamu ? (r.nama_tamu.length > 10 ? r.nama_tamu.slice(0, 9) + '…' : r.nama_tamu) : null
        return (
          <g key={m.id} style={{ cursor: isAdmin ? 'pointer' : 'default' }} onClick={() => isAdmin && onMejaClick(m.id)}>
            {chairs}
            <rect className="tbody-rect" x={m.x} y={m.y} width={m.w} height={m.h} rx="4" fill={f} stroke={c} strokeWidth="1.8" />
            <text x={m.x + m.w / 2} y={m.y + 12} fontFamily="DM Sans,sans-serif" fontSize="8" fill={c} textAnchor="middle" fontWeight="600">{m.nama}</text>
            {guestShort ? (
              <>
                <text x={m.x + m.w / 2} y={m.y + m.h / 2 + 2} fontFamily="DM Sans,sans-serif" fontSize="8" fill="#f0ead6" textAnchor="middle">{guestShort}</text>
                {r.jam && <text x={m.x + m.w / 2} y={m.y + m.h / 2 + 13} fontFamily="DM Sans,sans-serif" fontSize="7" fill={c} textAnchor="middle">{r.jam.slice(0, 5)}</text>}
              </>
            ) : (
              <text x={m.x + m.w / 2} y={m.y + m.h / 2 + 5} fontFamily="DM Sans,sans-serif" fontSize="8" fill={c} textAnchor="middle">Kosong</text>
            )}
            <circle cx={m.x + m.w - 8} cy={m.y + 8} r="4" fill={c} />
          </g>
        )
      })}
    </svg>
  )
}
