import type { PropsWithChildren } from 'react'
import { InstanceSidebar } from './components/instance-sidebar'
import { SocketProvider } from './providers/socket-provider'

interface LayoutProps extends PropsWithChildren {}

export default function InstanceLayout({ children }: LayoutProps) {
  return (
    <SocketProvider>
      <div className="flex w-full h-full">
        <InstanceSidebar />

        {children}
      </div>
    </SocketProvider>
  )
}
