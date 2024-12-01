'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { instanceParamsSchema } from '@/hooks/use-instance-params'
import { useParamsState } from '@/hooks/use-params-state'
import { Instance } from '@netzap/entities/chat'

interface InstanceItemProps {
  item: Instance
}

export function InstanceItem({ item }: InstanceItemProps) {
  const [{ instanceId: currentInstanceId }, setParams] = useParamsState({
    schema: instanceParamsSchema,
  })

  function handleSelect() {
    if (item.id === currentInstanceId) return

    setParams({ instanceId: item.id })
  }

  return (
    <DropdownMenuItem onClick={handleSelect} className="p-2 cursor-pointer">
      {item.name}
    </DropdownMenuItem>
  )
}
