'use client'

import type { Instance } from '@netzap/entities/chat'
import { useRouter } from 'next/navigation'

import { Paragraph } from '@/components/custom/typography'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getInitials } from '@/utils/get-initials'

interface InstanceItemProps {
  item: Instance
}

export function InstanceItem({ item }: InstanceItemProps) {
  const router = useRouter()

  const initials = getInitials({ value: item.name })
  const isConnected = item.status === 'connected'

  function handleSelect() {
    router.push(`/wa/${item.id}/chats`)
  }

  return (
    <Button
      variant="outline"
      className="w-full justify-between p-4 h-auto"
      onClick={handleSelect}
      disabled={!isConnected}
    >
      <div className="flex items-center space-x-2">
        <div className="size-8 bg-primary rounded-sm text-primary-foreground flex items-center justify-center">
          {initials}
        </div>

        <Paragraph className="font-medium">{item.name}</Paragraph>
      </div>

      <Badge variant={isConnected ? 'default' : 'secondary'}>
        {isConnected ? 'Conectado' : 'Desconectado'}
      </Badge>
    </Button>
  )
}
