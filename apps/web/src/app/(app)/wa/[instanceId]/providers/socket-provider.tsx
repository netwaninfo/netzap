'use client'

import { useAuth } from '@clerk/nextjs'
import { io } from 'socket.io-client'

import { env } from '@/env'
import { useInstanceParams } from '@/hooks/use-instance-params'
import { SocketIO } from '@/services/socket/types'
import { PropsWithChildren, createContext, useContext, useRef } from 'react'

interface SocketContextValue {
  socket: SocketIO
}

const SocketContext = createContext({} as SocketContextValue)

interface SocketProviderProps extends PropsWithChildren {}

const SOCKET_URL = new URL('/wa', env.NEXT_PUBLIC_NETZAP_SOCKET_URL)

export function SocketProvider({ children }: SocketProviderProps) {
  const { instanceId } = useInstanceParams()
  const { sessionId } = useAuth()

  const socketRef = useRef<SocketIO>(
    io(SOCKET_URL.toString(), {
      query: { instanceId },
      auth: { __session: sessionId },
    })
  )

  const socket = socketRef.current

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)
