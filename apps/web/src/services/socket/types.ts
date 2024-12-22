import type { ClientEvents, ServerEvents } from '@netzap/websocket/chat'
import type { Socket } from 'socket.io-client'

type SocketIO = Socket<ServerEvents, ClientEvents>

interface SocketReservedEvents {
  connect: () => void
  connect_error: (err: Error) => void
  disconnect: (reason: Socket.DisconnectReason, description?: unknown) => void
}

export type { SocketIO, SocketReservedEvents }
