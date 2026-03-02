'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return (
    <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-dark-100 border border-stone-200 dark:border-dark-50 animate-pulse" />
  )

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="
        relative w-10 h-10 rounded-full
        bg-stone-100 dark:bg-dark-100
        border border-stone-200 dark:border-dark-50
        hover:border-gold-400 dark:hover:border-gold-400
        transition-all duration-200
        flex items-center justify-center
        text-stone-500 dark:text-stone-400
        hover:text-gold-400 dark:hover:text-gold-400
        group
      "
      title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
    >
      <span className="text-base transition-transform duration-300 group-hover:scale-110">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
