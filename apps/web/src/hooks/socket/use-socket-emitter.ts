import type { ClientEvents } from '@netzap/websocket/chat'
import type { EventNames, EventParams } from '@socket.io/component-emitter'
import { useCallback } from 'react'

import { useSocketContext } from '@/app/(app)/wa/[instanceId]/providers/socket-provider'

function useSocketEmitter<T extends EventNames<ClientEvents>>(event: T) {
  const { socket } = useSocketContext()

  const emitter = useCallback(
    (...args: EventParams<ClientEvents, T>) => {
      if (!socket) return

      socket.emit(event, ...args)
    },
    [socket]
  )

  return emitter
}

export { useSocketEmitter }
