import { auth } from '@clerk/nextjs/server'
import type { PropsWithChildren } from 'react'

import { PrimarySidebar } from './components/primary-sidebar'
import { SocketProvider } from './providers/socket-provider'

interface InstanceLayoutProps extends PropsWithChildren {}

export default async function InstanceLayout({
  children,
}: InstanceLayoutProps) {
  const { getToken, redirectToSignIn } = await auth()
  const token = await getToken()

  if (!token) {
    return redirectToSignIn()
  }

  return (
    <SocketProvider token={token}>
      <div className="flex w-full h-full">
        <PrimarySidebar />

        {children}
      </div>
    </SocketProvider>
  )
}
