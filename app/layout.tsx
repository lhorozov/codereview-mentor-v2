import type { Metadata } from 'next'
import './globals.css'
import { TRPCProvider } from '@/trpc/client'

export const metadata: Metadata = {
  title: 'Code Review Mentor',
  description: 'The best AI code review tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <TRPCProvider>
        <body>
          {children}
        </body>
      </TRPCProvider>
    </html>
  )
}