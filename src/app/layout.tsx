import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'Simple Chat App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} dark`}>
        <header className='text-white font-bold bg-orange-800 text-2xl p-6 mb-3 rounded-b-lg  shadow-lg flex'>
          <div className='flex flex-grow'>
            <Link href='/'>Czat</Link>
          </div>
          <div></div>
        </header>
        <div className='flex flex-col md:flex-row'>
          <div className='flex-grow'>{children}</div>
        </div>
      </body>
    </html>
  )
}
