'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/custom/sidebar'
import { Avatar, AvatarImage, AvatarName } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGetMe } from '@/hooks/queries/user-get-me'
import { SignOutButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

export function UserMenu() {
  const [{ data: user }] = useGetMe()

  return (
    <SidebarMenu className="gap-0">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="size-8 relative rounded-lg p-0">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarName className="rounded-lg">{user.name}</AvatarName>
              </Avatar>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-dropdown-menu-trigger min-w-56 rounded-lg"
            align="start"
            side="top"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.imageUrl} alt={user.name} />
                  <AvatarName className="rounded-lg">{user.name}</AvatarName>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <SignOutButton>
              <DropdownMenuItem>
                <LogOut />
                Sair
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
