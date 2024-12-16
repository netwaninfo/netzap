import { useSocketContext } from '@/app/(app)/wa/[instanceId]/providers/socket-provider'
import { ServerEvents } from '@netzap/websocket/chat'
import { DependencyList, useEffect } from 'react'

import { SocketReservedEvents } from '@/services/socket/types'
import {
  ReservedOrUserEventNames,
  ReservedOrUserListener,
} from '@socket.io/component-emitter'

function useSocketEvent<
  T extends ReservedOrUserEventNames<SocketReservedEvents, ServerEvents>,
>(
  event: T,
  listener: ReservedOrUserListener<SocketReservedEvents, ServerEvents, T>,
  deps: DependencyList
) {
  const { socket } = useSocketContext()

  useEffect(() => {
    if (socket) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      socket.on(event, listener as any)

      return () => {
        socket.off(event)
      }
    }
  }, [socket, ...deps])
}

export { useSocketEvent }
