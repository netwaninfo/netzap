import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuButton,
} from '@/components/custom/sidebar'
import { MessageCircle } from 'lucide-react'
import { SelectInstance } from './select-instance'
import { UserMenu } from './user-menu'

export function InstanceSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SelectInstance />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton isActive className="size-8" variant="ghost">
              <MessageCircle className="size-4" />
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
