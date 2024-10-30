import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import { RootProvider } from './providers/root'

import './globals.css'

export const metadata: Metadata = {
  title: 'NetZap',
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <RootProvider>
      <html lang="en">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </RootProvider>
  )
}
