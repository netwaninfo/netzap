'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useInstanceParams } from '@/hooks/use-instance-params'
import { cn } from '@/lib/utils'
import type { Instance } from '@netzap/entities/chat'
import { useRouter } from 'next/navigation'

interface InstanceItemProps {
  item: Instance
}

export function InstanceItem({ item }: InstanceItemProps) {
  const router = useRouter()
  const { instanceId } = useInstanceParams()

  const isCurrentInstanceId = item.id === instanceId

  function handleSelect() {
    if (isCurrentInstanceId) return

    router.push(`/wa/${item.id}/chats`)
  }

  return (
    <DropdownMenuItem
      onClick={handleSelect}
      className={cn('p-2 cursor-pointer', isCurrentInstanceId && 'bg-accent')}
    >
      {item.name}
    </DropdownMenuItem>
  )
}
