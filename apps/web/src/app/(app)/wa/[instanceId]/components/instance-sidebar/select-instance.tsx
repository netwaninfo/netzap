'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/custom/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Each } from '@/components/utilities/each'
import { useFetchInstances } from '@/hooks/queries/use-fetch-instances'
import { useInstanceParams } from '@/hooks/use-instance-params'
import { getInitials } from '@/utils/get-initials'
import { InstanceItem } from './instance-item'

export function SelectInstance() {
  const { instanceId } = useInstanceParams()
  const [{ data: instances }] = useFetchInstances({
    query: { page: 1, status: 'connected' },
  })

  const currentInstance = instances.find(instance => instance.id === instanceId)

  function handlePreventFocusOnTrigger(event: Event) {
    event.preventDefault()
  }

  const instanceInitials = getInitials({ value: currentInstance?.name ?? '' })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="aspect-square size-8 items-center justify-center"
          >
            <SidebarMenuButton>{instanceInitials}</SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-dropdown-menu-trigger min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
            onCloseAutoFocus={handlePreventFocusOnTrigger}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              WhatsApp's
            </DropdownMenuLabel>

            <Each
              items={instances}
              render={({ item }) => <InstanceItem item={item} />}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
