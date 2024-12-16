import { ClientEvents, ServerEvents } from '@netzap/websocket/chat'
import { Server } from 'socket.io'

export type SocketServer = Server<ClientEvents, ServerEvents>
