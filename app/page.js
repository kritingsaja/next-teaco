export default function Home() {
  const driveFileId = '1u-eJ2L6tk4EruWzmkm-bc_rLIZ8vog81'
  const embedUrl = `https://drive.google.com/file/d/${driveFileId}/preview`
  const waLink = 'https://api.whatsapp.com/send/?phone=628112777555&text&type=phone_number&app_absent=0'
  const mapsLink = 'https://share.google/wHx2OWWrK6WguJc1A'

  const batikSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
    <rect width='80' height='80' fill='none'/>
    <g opacity='0.18' stroke='%23c8a96e' stroke-width='0.6' fill='none'>
      <path d='M40 10 C50 20, 60 15, 70 25 C60 35, 50 30, 40 40 C30 30, 20 35, 10 25 C20 15, 30 20, 40 10Z'/>
      <path d='M40 10 C50 20, 60 15, 70 25 C60 35, 50 30, 40 40 C30 30, 20 35, 10 25 C20 15, 30 20, 40 10Z' transform='translate(0,40)'/>
      <path d='M40 10 C50 20, 60 15, 70 25 C60 35, 50 30, 40 40 C30 30, 20 35, 10 25 C20 15, 30 20, 40 10Z' transform='translate(40,20)'/>
      <circle cx='40' cy='25' r='4'/>
      <circle cx='40' cy='65' r='4'/>
      <circle cx='20' cy='45' r='2.5'/>
      <circle cx='60' cy='45' r='2.5'/>
      <circle cx='0' cy='25' r='2.5'/>
      <circle cx='80' cy='25' r='2.5'/>
      <line x1='40' y1='0' x2='40' y2='80'/>
      <line x1='0' y1='40' x2='80' y2='40'/>
      <path d='M10 10 Q20 0 30 10 Q40 20 50 10 Q60 0 70 10'/>
      <path d='M10 70 Q20 60 30 70 Q40 80 50 70 Q60 60 70 70'/>
    </g>
  </svg>`

  const batikBg = `url("data:image/svg+xml,${batikSvg}")`

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: batikBg, backgroundSize: '80px 80px' }}>
      {/* Overlay biar konten tetap terbaca */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'rgba(15,14,11,0.88)' }} />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">

        <section className="text-center py-4 flex flex-col items-center gap-3">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 dark:text-stone-500">
            Selamat Datang di
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-stone-800 dark:text-stone-100 tracking-tight">
            Menu <span className="text-gold-400">Tea Co +</span>
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm">
            Lihat buku menu kami atau hubungi CS untuk informasi lebih lanjut.
          </p>
          <div className="flex items-center justify-center gap-3 mt-2 w-full max-w-xs">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-600/30">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Hubungi CS
            </a>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 dark:bg-dark-100 border border-stone-200 dark:border-dark-50 text-stone-700 dark:text-stone-300 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-400">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Lokasi
            </a>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-widest uppercase text-stone-400 dark:text-stone-500 text-center">Buku Menu</h2>
          <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-dark-50 shadow-sm bg-white dark:bg-dark-100">
            <iframe src={embedUrl} className="w-full" style={{ height: '80vh', minHeight: '500px' }} allow="autoplay" title="Buku Menu Tea Co +" />
          </div>
          <p className="text-xs text-center text-stone-400 dark:text-stone-600">
            Tidak bisa lihat menu?{' '}
            <a href={`https://drive.google.com/file/d/${driveFileId}/view`} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">Buka di Google Drive</a>
          </p>
        </section>

      </main>

      <footer className="relative z-10 border-t border-stone-200 dark:border-dark-50 py-6 px-4 text-center">
        <p className="text-xs text-stone-400 dark:text-stone-600 tracking-wider uppercase">Tea Co + · CS: +62 811-2777-555</p>
      </footer>

      <div className="fixed bottom-5 right-5 z-40 group">
        <a href="/admin" className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-dark-100 border border-stone-200 dark:border-dark-50 hover:border-gold-400 text-stone-400 dark:text-stone-500 hover:text-gold-400 shadow-md transition-all duration-200 hover:-translate-y-1 text-lg" title="Admin Login">⚙️</a>
        <span className="absolute right-14 bottom-1/2 translate-y-1/2 bg-white dark:bg-dark-100 border border-stone-200 dark:border-dark-50 text-stone-600 dark:text-stone-400 text-xs px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-sm">Admin Login</span>
      </div>
    </div>
  )
}
