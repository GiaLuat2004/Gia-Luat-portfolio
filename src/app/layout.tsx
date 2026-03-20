import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { getImagePath } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portfolio | Gia Luat',
  icons: {
    icon: getImagePath('/images/logo.png'),
    shortcut: getImagePath('/images/logo.png'),
  },
  description:
    'Portfolio of Cao Bao Gia Luat – Fullstack Developer Intern specializing in React, Next.js, Node.js, and AI-powered systems.',
  keywords: ['portfolio', 'fullstack developer', 'react', 'next.js', 'nodejs', 'typescript', 'web developer vietnam'],
  authors: [{ name: 'Cao Bao Gia Luat', url: 'https://github.com/GiaLuat2004' }],
  openGraph: {
    title: 'Portfolio | Gia Luat',
    description: 'Fullstack Developer Intern – React, Next.js, Node.js',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
