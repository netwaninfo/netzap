'use client'
import { type PropsWithChildren, createContext, useContext } from 'react'
import { io } from 'socket.io-client'

import { env } from '@/env'
import type { SocketIO } from '@/types/socket'

import { useInstanceParams } from '@/hooks/use-instance-params'

const SocketContext = createContext({} as SocketIO)

interface SocketProviderProps extends PropsWithChildren {
  token: string
}

const SOCKET_URL = new URL('/wa', env.NEXT_PUBLIC_NETZAP_SOCKET_URL)

export function SocketProvider({ children, token }: SocketProviderProps) {
  const { instanceId } = useInstanceParams()

  const socket = io(SOCKET_URL.toString(), {
    query: { instanceId },
    auth: { __session: token },
  })

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)
