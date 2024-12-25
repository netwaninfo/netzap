import type { ClientEvents, ServerEvents } from '@netzap/websocket/chat'
import type { Socket } from 'socket.io-client'

interface SocketReservedEvents {
  connect: () => void
  connect_error: (err: Error) => void
  disconnect: (reason: Socket.DisconnectReason, description?: unknown) => void
}

type SocketIO = Socket<SocketReservedEvents & ServerEvents, ClientEvents>

export type { SocketIO, SocketReservedEvents }
