import Header from '../components/Header'
import InfoBar from '../components/InfoBar'

export default function Home() {
  const driveFileId = '1u-eJ2L6tk4EruWzmkm-bc_rLIZ8vog81'
  const embedUrl = `https://drive.google.com/file/d/${driveFileId}/preview`

  return (
    <div className="min-h-screen flex flex-col">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E")`,
        }}
      />
      <Header />
      <InfoBar />

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-8">

        {/* Hero Section */}
        <section className="text-center py-6 flex flex-col items-center gap-3">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 dark:text-stone-500">
            Ramadan 1446 H
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-stone-800 dark:text-stone-100 tracking-tight">
            Selamat Datang di <span className="text-gold-400">Tea Co +</span>
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Nikmati menu spesial Ramadan kami. Lihat buku menu lengkap di bawah ini.
          </p>
          <a
            href="/reservasi"
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400 hover:bg-gold-500 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-400/30"
          >
            Reservasi Sekarang →
          </a>
        </section>

        {/* Menu PDF Embed */}
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-widest uppercase text-stone-400 dark:text-stone-500 text-center">
            Buku Menu
          </h2>
          <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-dark-50 shadow-sm dark:shadow-none bg-white dark:bg-dark-100">
            <iframe
              src={embedUrl}
              className="w-full"
              style={{ height: '80vh', minHeight: '500px' }}
              allow="autoplay"
              title="Buku Menu Tea Co +"
            />
          </div>
          <p className="text-xs text-center text-stone-400 dark:text-stone-600">
            Tidak bisa lihat menu?{' '}
            
              href={`https://drive.google.com/file/d/${driveFileId}/view`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:underline"
            >
              Buka di Google Drive
            </a>
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-dark-50 py-6 px-4 text-center">
        <p className="text-xs text-stone-400 dark:text-stone-600 tracking-wider uppercase">
          Cek Ketersediaan · Ramadan 1446 H · Tea Co +
        </p>
      </footer>

      {/* Admin FAB */}
      <div className="fixed bottom-5 right-5 z-40 group">
        
          href="/admin"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-dark-100 border border-stone-200 dark:border-dark-50 hover:border-gold-400 dark:hover:border-gold-400 text-stone-400 dark:text-stone-500 hover:text-gold-400 shadow-md dark:shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-gold-400/10 text-lg"
          title="Admin Login"
        >
          ⚙️
        </a>
        <span className={`
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
        `}>
          Admin Login
        </span>
      </div>
    </div>
  )
}
