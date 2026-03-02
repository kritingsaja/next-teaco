import Header from '../components/Header'
import InfoBar from '../components/InfoBar'
import Calendar from '../components/Calendar'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E")`
        }}
      />

      <Header />
      <InfoBar />

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        <Calendar />
      </main>

      {/* Footer */}
      <footer className="
        border-t border-stone-200 dark:border-dark-50
        py-6 px-4
        text-center
      ">
        <p className="text-xs text-stone-400 dark:text-stone-600 tracking-wider uppercase">
          Reservasi Meja · Ramadan 1446 H · Tea Co & Resto
        </p>
      </footer>

      {/* Admin FAB */}
      <div className="fixed bottom-5 right-5 z-40 group">
        <a
          href="/admin"
          className="
            flex items-center justify-center
            w-12 h-12 rounded-full
            bg-white dark:bg-dark-100
            border border-stone-200 dark:border-dark-50
            hover:border-gold-400 dark:hover:border-gold-400
            text-stone-400 dark:text-stone-500
            hover:text-gold-400
            shadow-md dark:shadow-none
            transition-all duration-200
            hover:-translate-y-1
            hover:shadow-xl dark:hover:shadow-gold-400/10
            text-lg
          "
          title="Admin Login"
        >
          ⚙️
        </a>
        {/* Tooltip */}
        <span className="
          absolute right-14 bottom-1/2 translate-y-1/2
          bg-white dark:bg-dark-100
          border border-stone-200 dark:border-dark-50
          text-stone-600 dark:text-stone-400
          text-xs px-2.5 py-1 rounded-lg
          whitespace-nowrap
          opacity-0 group-hover:opacity-100
          pointer-events-none
          transition-all duration-200
          shadow-sm
        ">
          Admin Login
        </span>
      </div>
    </div>
  )
}
