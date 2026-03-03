export default function InfoBar() {
  return (
    <div className="
      bg-gradient-to-r from-gold-400/10 via-gold-400/5 to-gold-400/10
      border-b border-stone-200 dark:border-dark-50
      py-3 px-4
    ">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-stone-500 dark:text-stone-400 text-center sm:text-left flex items-center gap-1.5">
          <span>📍</span>
          Konfirmasi lebih lanjut hubungi admin untuk reservasi
        </p>

        <div className="flex items-center gap-2 sm:hidden">
          <a
            href="https://wa.me/628112777555"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2 px-4 py-2 rounded-full
              bg-gold-400 hover:bg-gold-300
              text-dark-300 font-semibold text-sm
              transition-all duration-200
            "
          >
            💬 Hubungi Admin
          </a>
          <a
            href="https://drive.google.com/file/d/1u-eJ2L6tk4EruWzmkm-bc_rLIZ8vog81/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2 px-4 py-2 rounded-full
              border border-gold-400/50
              text-gold-400 font-medium text-sm
              transition-all duration-200
            "
          >
            🍽️ Menu
          </a>
        </div>
      </div>
    </div>
  )
}
