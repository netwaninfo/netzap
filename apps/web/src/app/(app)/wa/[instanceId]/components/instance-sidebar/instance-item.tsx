'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { instanceParamsSchema } from '@/hooks/use-instance-params'
import { useParamsState } from '@/hooks/use-params-state'
import { cn } from '@/lib/utils'
import { Instance } from '@netzap/entities/chat'

interface InstanceItemProps {
  item: Instance
}

export function InstanceItem({ item }: InstanceItemProps) {
  const [{ instanceId: currentInstanceId }, setParams] = useParamsState({
    schema: instanceParamsSchema,
  })

  const isCurrentInstanceId = item.id === currentInstanceId

  function handleSelect() {
    if (isCurrentInstanceId) return

    setParams({ instanceId: item.id })
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
