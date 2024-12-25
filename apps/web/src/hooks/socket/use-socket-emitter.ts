import type { EventNames, EventParams } from '@socket.io/component-emitter'
import { useCallback } from 'react'

import type { ClientEvents } from '@netzap/websocket/chat'

import type { SocketIO } from '@/types/socket'

function useSocketEmitter<T extends EventNames<ClientEvents>>(
  socket: SocketIO,
  event: T
) {
  const emitter = useCallback((...args: EventParams<ClientEvents, T>) => {
    socket.emit(event, ...args)
  }, [])

  return emitter
}

export { useSocketEmitter }
