import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { RootProvider } from '@/providers/root-provider'

import './globals.css'

export const metadata: Metadata = {
  title: 'NetZap',
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
