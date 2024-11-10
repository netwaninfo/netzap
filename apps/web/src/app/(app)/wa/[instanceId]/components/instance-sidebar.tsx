import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageCircle } from 'lucide-react'
import { Suspense } from 'react'
import { SelectInstance } from './select-instance'
import { UserMenu } from './user-menu'

export function InstanceSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SelectInstance />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <MessageCircle />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Suspense
          fallback={
            <Skeleton className="h-8 w-8 rounded-lg bg-sidebar-accent" />
          }
        >
          <UserMenu />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  )
}
