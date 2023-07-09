import { NextAuthProvider } from '@/providers/auth'
import './globals.css'
import { Poppins } from 'next/font/google'
import { Header } from '../components/Header'

const poppins = Poppins({ subsets: ['latin'], weight:['400','700'] })

export const metadata = {
  title: 'FSW Trips',
  description: 'Sistema de reserva de viagens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <Header />
          { children }
        </NextAuthProvider>
        </body>
    </html>
  )
}
