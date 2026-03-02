import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="
      sticky top-0 z-50
      border-b border-stone-200 dark:border-dark-50
      bg-cream-50/80 dark:bg-dark-300/80
      backdrop-blur-md
    ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="
              w-9 h-9 rounded-lg
              bg-gradient-to-br from-gold-400 to-gold-500
              flex items-center justify-center text-dark-300 text-sm font-bold
              shadow-lg shadow-gold-400/20
            ">
              🌙
            </div>
            <div>
              <h1 className="font-display text-lg sm:text-xl text-stone-800 dark:text-cream-100 leading-tight">
                Reservasi Meja
              </h1>
              <p className="text-[0.65rem] sm:text-xs text-stone-400 dark:text-stone-500 tracking-widest uppercase">
                Ramadan 1446 H · Tea Co & Resto
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/628112777555"
              target="_blank"
              rel="noopener noreferrer"
              className="
                hidden sm:inline-flex items-center gap-2
                px-4 py-2 rounded-full
                bg-gold-400 hover:bg-gold-300
                text-dark-300 font-semibold text-sm
                transition-all duration-200
                hover:shadow-lg hover:shadow-gold-400/25
                hover:-translate-y-0.5
              "
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </a>

            {/* Menu */}
            <a
              href="https://drive.google.com/file/d/1u-eJ2L6tk4EruWzmkm-bc_rLIZ8vog81/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="
                hidden sm:inline-flex items-center gap-2
                px-4 py-2 rounded-full
                border border-gold-400/50 hover:border-gold-400
                text-gold-400 font-medium text-sm
                transition-all duration-200
                hover:bg-gold-400/10
              "
            >
              <span>🍽️</span>
              <span>Menu</span>
            </a>

            {/* Mobile WhatsApp icon */}
            <a
              href="https://wa.me/628112777555"
              target="_blank"
              rel="noopener noreferrer"
              className="
                sm:hidden
                w-9 h-9 rounded-full
                bg-gold-400 hover:bg-gold-300
                flex items-center justify-center text-dark-300
                transition-all duration-200
              "
            >
              💬
            </a>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
