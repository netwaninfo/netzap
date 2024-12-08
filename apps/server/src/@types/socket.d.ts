// types/socket.d.ts
import 'socket.io'

declare module 'socket.io' {
  interface Socket {
    userId: string // Adicione sua nova propriedade aqui
  }
}
