'use client'

import type { Instance } from '@netzap/entities/chat'

import { useRouter } from 'next/navigation'

import { Badge } from '@netzap/ui/components/badge'
import { Button } from '@netzap/ui/components/button'
import { Paragraph } from '@netzap/ui/components/typography'
import { useInitials } from '@netzap/ui/hooks/use-initials'

interface InstanceItemProps {
  item: Instance
}

export function InstanceItem({ item }: InstanceItemProps) {
  const router = useRouter()
  const initials = useInitials({ value: item.name })

  function handleSelect() {
    router.push(`/wa/${item.id}/chats`)
  }

  return (
    <Button
      variant="outline"
      className="w-full justify-between p-4 h-auto"
      onClick={handleSelect}
    >
      <div className="flex items-center space-x-2">
        <div className="size-8 bg-primary rounded-sm text-primary-foreground flex items-center justify-center">
          {initials}
        </div>

        <Paragraph className="font-medium">{item.name}</Paragraph>
      </div>

      <Badge>Conectado</Badge>
    </Button>
  )
}
