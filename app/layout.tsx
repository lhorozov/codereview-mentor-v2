import type { Metadata } from 'next'
import './globals.css'
 
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
      <body>{children}</body>
    </html>
  )
}