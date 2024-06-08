"use client"

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import io, { Socket } from "socket.io-client"

import { useAuth } from "@/hooks/useAuth"

//Query Provider
export const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

//Socket Provider
interface ISocketContext {
  socket: Socket | null
  onlineUsers: string[]
}

export const useSocketContext = (): ISocketContext => {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    )
  }
  return context
}

const socketUrl = process.env.BASE_URL || "https://fitin-server.onrender.com"

const SocketContext = createContext<ISocketContext | undefined>(undefined)

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const socketRef = useRef<Socket | null>(null)

  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const { data: authUser, isLoading } = useAuth()

  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(socketUrl, {
        query: {
          userId: authUser.id
        }
      })
      socketRef.current = socket

      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users)
      })

      return () => {
        socket.close()
        socketRef.current = null
      }
    } else if (!authUser && !isLoading) {
      if (socketRef.current) {
        socketRef.current.close()
        socketRef.current = null
      }
    }
  }, [authUser, isLoading])

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}
