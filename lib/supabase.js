const SUPABASE_URL = 'https://ugobauwqlonyepldrvfn.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnb2JhdXdxbG9ueWVwbGRydmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDQwNjcsImV4cCI6MjA4NzU4MDA2N30.56Vv1HJDK5ygTUlf68BIslr-nznOb5sVUq5gjz_5CI8'

const MAX_KAPASITAS = 60

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': 'Bearer ' + SUPABASE_KEY,
}

export async function getReservasiByMonth(year, month) {
  const pad = (n) => String(n).padStart(2, '0')
  const startDate = `${year}-${pad(month + 1)}-01`
  const lastDay = new Date(year, month + 1, 0).getDate()
  const endDate = `${year}-${pad(month + 1)}-${pad(lastDay)}`

  const url = `${SUPABASE_URL}/rest/v1/reservasi?tanggal=gte.${startDate}&tanggal=lte.${endDate}&select=tanggal,jumlah_tamu`

  const res = await fetch(url, { headers, cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch')

  const rows = await res.json()

  const resData = {}
  rows.forEach((r) => {
    if (!resData[r.tanggal]) resData[r.tanggal] = { count: 0, pax: 0 }
    resData[r.tanggal].count++
    resData[r.tanggal].pax += r.jumlah_tamu || 0
  })

  return resData
}

export function getOccupancyStatus(pax) {
  const persen = Math.min(100, Math.round((pax / MAX_KAPASITAS) * 100))

  if (persen >= 100) return { persen, label: 'PENUH', level: 'full' }
  if (persen >= 80) return { persen, label: 'Hampir Penuh', level: 'high' }
  if (persen >= 50) return { persen, label: 'Ramai', level: 'med' }
  return { persen, label: 'Tersedia', level: 'low' }
}

export const MAX_CAP = MAX_KAPASITAS
