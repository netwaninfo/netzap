import type { Server, Socket } from 'socket.io'

export type SocketMiddlewareNext = Parameters<Parameters<Server['use']>[0]>[1]

export interface SocketMiddleware {
  execute(socket: Socket, next: SocketMiddlewareNext): void
}
