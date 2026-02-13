import type { Metadata, Viewport } from 'next'
import { Inter, Cinzel } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })

export const metadata: Metadata = {
  title: 'Achievement Log - Game Design Portfolio',
  description: 'A game designer\'s achievements, certifications, and milestones presented as an MMORPG achievement panel.',
}

export const viewport: Viewport = {
  themeColor: '#1a1d25',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased overflow-hidden">{children}</body>
    </html>
  )
}
