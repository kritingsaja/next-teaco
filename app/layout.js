import './globals.css'
import { ThemeProvider } from './providers'

export const metadata = {
  title: 'Cek Ketersediaan · Ramadan 1446 H',
  description: 'Tea.Co+ — Cek ketersediaan untuk reservasi selama Ramadan 1446 H',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
