'use client'

import type { Instance } from '@netzap/entities/chat'
import { useRouter } from 'next/navigation'

import { useInstanceParams } from '@/hooks/use-instance-params'

import { Button } from '@netzap/ui/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@netzap/ui/components/tooltip'

import { SidebarMenuItem } from '@/components/ui/sidebar'
import { useInitials } from '@netzap/ui/hooks/use-initials'

interface InstanceItemProps {
  item: Instance
}

export function InstanceItem({ item }: InstanceItemProps) {
  const router = useRouter()
  const { instanceId } = useInstanceParams()

  const initials = useInitials({ value: item.name })
  const isCurrentInstanceId = item.id === instanceId

  function handleSelect() {
    if (isCurrentInstanceId) return

    router.push(`/wa/${item.id}/chats`)
  }

  return (
    <SidebarMenuItem>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-8"
              onClick={handleSelect}
              variant={isCurrentInstanceId ? 'default' : 'outline'}
            >
              {initials}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{item.name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SidebarMenuItem>
  )
}
