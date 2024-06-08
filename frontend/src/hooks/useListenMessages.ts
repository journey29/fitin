import { useEffect } from "react"

import { useSocketContext } from "@/components/Providers"

import useConversation from "@/store/useConversation"

export const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useConversation()

  useEffect(() => {
    socket?.on("newMessage", newMessage => {
      setMessages([...messages, newMessage])
    })

    return () => {
      socket?.off("newMessage")
    }
  }, [socket, messages, setMessages])
}
