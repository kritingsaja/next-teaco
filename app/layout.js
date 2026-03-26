import './globals.css'
import { ThemeProvider } from './providers'

export const metadata = {
  title: 'T3ACO+',
  description: 'Tea.Co+ — Menu Favorit & Lokasi Kami Ada di Sini',
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
