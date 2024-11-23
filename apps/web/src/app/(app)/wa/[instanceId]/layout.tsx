import { PropsWithChildren } from 'react'
import { InstanceSidebar } from './components/instance-sidebar'

interface LayoutProps extends PropsWithChildren {}

export default function InstanceLayout({ children }: LayoutProps) {
  return (
    <div className="flex w-full h-full">
      <InstanceSidebar />

      {children}
    </div>
  )
}
