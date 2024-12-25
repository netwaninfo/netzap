import { Suspense } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar'
import { Skeleton } from '@netzap/ui/components/skeleton'

import { InstancesList } from './instances/instances-list'
import { InstancesListSkeleton } from './instances/instances-list-skeleton'
import { UserMenu } from './user-menu'

export function PrimarySidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center">
        <SidebarMenu>
          <Suspense fallback={<InstancesListSkeleton amount={4} />}>
            <InstancesList />
          </Suspense>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent />

      <SidebarFooter>
        <SidebarMenu>
          <Suspense fallback={<Skeleton className="size-8 rounded-md" />}>
            <UserMenu />
          </Suspense>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
