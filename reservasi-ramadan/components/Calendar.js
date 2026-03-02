'use client'
import { useState, useEffect, useCallback } from 'react'
import CalendarCell from './CalendarCell'
import { getReservasiByMonth } from '@/lib/supabase'

const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function pad(n) { return String(n).padStart(2, '0') }
function dateStr(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}` }

export default function Calendar() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [resData, setResData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = useCallback(async (y, m) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getReservasiByMonth(y, m)
      setResData(data)
    } catch (e) {
      setError('Gagal memuat data. Coba refresh halaman.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData(year, month)
  }, [year, month, loadData])

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }
  const goToday = () => { setYear(today.getFullYear()); setMonth(today.getMonth()) }

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayStr = dateStr(today.getFullYear(), today.getMonth(), today.getDate())

  // Build grid cells
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  // Fill to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="animate-fade-in">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-stone-800 dark:text-cream-100">
            {BULAN[month]} {year}
          </h2>
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
            Kapasitas: 60 pax per malam
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={prevMonth}
            className="
              w-9 h-9 rounded-lg
              bg-white dark:bg-dark-100
              border border-stone-200 dark:border-dark-50
              hover:border-gold-400 dark:hover:border-gold-400
              text-stone-500 dark:text-stone-400
              hover:text-gold-400
              transition-all duration-150
              flex items-center justify-center text-base font-bold
            "
          >
            ‹
          </button>
          <button
            onClick={goToday}
            className="
              px-3 h-9 rounded-lg text-xs font-medium
              bg-white dark:bg-dark-100
              border border-stone-200 dark:border-dark-50
              hover:border-gold-400 dark:hover:border-gold-400
              text-stone-600 dark:text-stone-400
              hover:text-gold-400
              transition-all duration-150
            "
          >
            Hari Ini
          </button>
          <button
            onClick={nextMonth}
            className="
              w-9 h-9 rounded-lg
              bg-white dark:bg-dark-100
              border border-stone-200 dark:border-dark-50
              hover:border-gold-400 dark:hover:border-gold-400
              text-stone-500 dark:text-stone-400
              hover:text-gold-400
              transition-all duration-150
              flex items-center justify-center text-base font-bold
            "
          >
            ›
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Calendar grid */}
      <div className="
        bg-white dark:bg-dark-100
        border border-stone-200 dark:border-dark-50
        rounded-xl overflow-hidden
        shadow-sm dark:shadow-none
      ">
        {/* Days header */}
        <div className="grid grid-cols-7 border-b border-stone-100 dark:border-dark-50 bg-stone-50 dark:bg-dark-200">
          {HARI.map((h) => (
            <div key={h} className="text-center py-2.5 text-[0.65rem] sm:text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 font-medium">
              {h}
            </div>
          ))}
        </div>

        {/* Loading overlay */}
        {loading ? (
          <div className="grid grid-cols-7">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="
                  border-r border-b border-stone-100 dark:border-dark-50
                  min-h-[90px] sm:min-h-[110px] p-2 sm:p-3
                "
              >
                <div className="skeleton h-5 w-6 rounded mb-2 bg-stone-100 dark:bg-dark-50" />
                <div className="skeleton h-1.5 w-full rounded-full bg-stone-100 dark:bg-dark-50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const dstr = day ? dateStr(year, month, day) : null
              const isPast = day ? new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate()) : false
              const isToday = dstr === todayStr

              return (
                <CalendarCell
                  key={i}
                  day={day}
                  dstr={dstr}
                  isPast={isPast}
                  isToday={isToday}
                  data={dstr ? resData[dstr] : null}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-5">
        {[
          { color: 'bg-emerald-400', label: 'Tersedia (<50%)', textColor: 'text-emerald-600 dark:text-emerald-400' },
          { color: 'bg-amber-400', label: 'Ramai (50–79%)', textColor: 'text-amber-600 dark:text-amber-400' },
          { color: 'bg-red-400', label: 'Hampir Penuh (80–99%)', textColor: 'text-red-500 dark:text-red-400' },
          { color: 'bg-red-600', label: 'Penuh (100%)', textColor: 'text-red-700 dark:text-red-300' },
        ].map(({ color, label, textColor }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${color} flex-shrink-0`} />
            <span className={`text-xs ${textColor}`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Refresh hint */}
      <p className="text-center text-[0.65rem] text-stone-300 dark:text-stone-600 mt-4">
        Data diperbarui secara real-time
      </p>
    </div>
  )
}
