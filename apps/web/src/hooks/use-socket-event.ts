import { ServerEvents } from '@netzap/websocket/chat'
import {
  ReservedOrUserEventNames,
  ReservedOrUserListener,
} from '@socket.io/component-emitter'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

import { SocketReservedEvents } from '@/services/socket/types'

interface UseSocketListenerProps<
  T extends ServerEvents,
  Event extends ReservedOrUserEventNames<SocketReservedEvents, T>,
> {
  socket: Socket<T>
  event: Event
  listener: ReservedOrUserListener<SocketReservedEvents, T, Event>
}

function useSocketListener<
  T extends ServerEvents,
  Event extends ReservedOrUserEventNames<SocketReservedEvents, T>,
>({ event, listener, socket }: UseSocketListenerProps<T, Event>) {
  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    socket?.on(event, listener as any)

    return () => {
      socket?.off(event)
    }
  }, [socket, listener, event])
}

export { useSocketListener }
