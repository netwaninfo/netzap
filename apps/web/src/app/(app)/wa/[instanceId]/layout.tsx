import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { PropsWithChildren } from 'react'

import { InstanceSidebar } from './components/instance-sidebar'

interface LayoutProps extends PropsWithChildren {}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider open={false}>
      <InstanceSidebar />

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
