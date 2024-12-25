'use client'

import { SignOutButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

import { useGetAttendant } from '@/hooks/queries/use-get-attendant'

import { SidebarMenuItem } from '@/components/ui/sidebar'
import {
  Avatar,
  AvatarImage,
  AvatarInitials,
} from '@netzap/ui/components/avatar'
import { Button } from '@netzap/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@netzap/ui/components/dropdown-menu'
import { Small } from '@netzap/ui/components/typography'

export function UserMenu() {
  const [{ data: user }] = useGetAttendant()

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 relative p-0 ">
            <Avatar className="size-8 rounded-md">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarInitials className="rounded-md">
                {user.name}
              </AvatarInitials>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-dropdown-menu-trigger min-w-56 rounded-md"
          align="end"
          side="right"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="size-8 rounded-md">
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarInitials className="rounded-md">
                  {user.name}
                </AvatarInitials>
              </Avatar>

              <div className="grid flex-1 text-left">
                <Small className="truncate font-semibold leading-tight">
                  {user.name}
                </Small>

                <Small className="truncate text-xs leading-tight">
                  {user.email}
                </Small>
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
  )
}
