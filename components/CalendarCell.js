import { getOccupancyStatus } from '../lib/supabase'

const levelConfig = {
  low: {
    cell: 'bg-white dark:bg-dark-100 hover:bg-cream-50 dark:hover:bg-dark-50',
    bar: 'bg-gold-400',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  },
  med: {
    cell: 'bg-amber-50/60 dark:bg-amber-900/10',
    bar: 'bg-amber-400',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  },
  high: {
    cell: 'bg-red-50/60 dark:bg-red-900/10',
    bar: 'bg-red-400',
    text: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  },
  full: {
    cell: 'bg-red-100/80 dark:bg-red-900/20',
    bar: 'bg-red-500',
    text: 'text-red-700 dark:text-red-300',
    badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700',
  },
}

export default function CalendarCell({ day, dstr, isPast, isToday, data }) {
  const { persen, label, level } = getOccupancyStatus(data?.pax || 0)
  const cfg = levelConfig[level]
  const isEmpty = !day

  if (isEmpty) {
    return (
      <div className="
        border-r border-b border-stone-100 dark:border-dark-50
        last-of-type:border-r-0
        min-h-[90px] sm:min-h-[110px]
      " />
    )
  }

  return (
    <div
      className={`
        border-r border-b border-stone-100 dark:border-dark-50
        min-h-[90px] sm:min-h-[110px]
        p-2 sm:p-3
        transition-colors duration-150
        relative group
        ${isPast ? 'opacity-40' : cfg.cell}
        ${isToday ? 'ring-2 ring-inset ring-gold-400 dark:ring-gold-400' : ''}
      `}
    >
      {/* Day number */}
      <div className={`
        font-display text-base sm:text-lg leading-none mb-1.5
        ${isToday ? 'text-gold-400 font-bold' : 'text-stone-700 dark:text-cream-200'}
      `}>
        {day}
        {isToday && (
          <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-gold-400 align-middle mb-0.5" />
        )}
      </div>

      {/* Progress bar */}
      {!isPast && (
        <>
          <div className="w-full h-1.5 bg-stone-100 dark:bg-dark-50 rounded-full overflow-hidden mb-1.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${cfg.bar}`}
              style={{ width: `${persen}%` }}
            />
          </div>

          {/* Status */}
          <div className={`
            inline-flex items-center px-1.5 py-0.5 rounded-md
            text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-wide
            border ${cfg.badge}
          `}>
            {label}
          </div>

          {/* Percentage */}
          <div className={`text-[0.6rem] mt-0.5 ${cfg.text} font-medium`}>
            {persen}%
          </div>
        </>
      )}
    </div>
  )
}
