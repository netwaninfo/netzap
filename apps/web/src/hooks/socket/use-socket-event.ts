import type {
  ReservedOrUserEventNames,
  ReservedOrUserListener,
} from '@socket.io/component-emitter'
import { useEffect } from 'react'

import type { ServerEvents } from '@netzap/websocket/chat'

import type { SocketIO, SocketReservedEvents } from '@/types/socket'

function useSocketEvent<
  T extends ReservedOrUserEventNames<SocketReservedEvents, ServerEvents>,
>(
  socket: SocketIO,
  event: T,
  listener: ReservedOrUserListener<SocketReservedEvents, ServerEvents, T>
) {
  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    socket.on(event, listener as any)

    return () => {
      socket.off(event)
    }
  }, [])
}

export { useSocketEvent }
