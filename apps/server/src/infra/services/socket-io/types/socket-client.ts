import { ClientEvents, ServerEvents } from '@netzap/websocket/chat'
import { Socket } from 'socket.io'

export type SocketClient = Socket<ServerEvents, ClientEvents>
