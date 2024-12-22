'use client'
import { io } from 'socket.io-client'

import { env } from '@/env'
import { useInstanceParams } from '@/hooks/use-instance-params'
import type { SocketIO } from '@/services/socket/types'
import { useAuth } from '@clerk/nextjs'
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface SocketContextValue {
  socket: SocketIO | null
}

const SocketContext = createContext({} as SocketContextValue)

interface SocketProviderProps extends PropsWithChildren {}

const SOCKET_URL = new URL('/wa', env.NEXT_PUBLIC_NETZAP_SOCKET_URL)

export function SocketProvider({ children }: SocketProviderProps) {
  const { instanceId } = useInstanceParams()
  const { getToken } = useAuth()

  const [socket, setSocket] = useState<SocketIO | null>(null)

  const createSocketClient = useCallback(async () => {
    const socket: SocketIO = io(SOCKET_URL.toString(), {
      query: { instanceId },
      auth: { __session: await getToken() },
    })

    setSocket(socket)
  }, [])

  useEffect(() => {
    createSocketClient()
  }, [createSocketClient])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)
