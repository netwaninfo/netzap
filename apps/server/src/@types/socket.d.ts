// types/socket.d.ts
import 'socket.io'

declare module 'socket.io' {
  interface Socket {
    userId: string
    instanceId: string
  }
}
