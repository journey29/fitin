import { useQuery } from "@tanstack/react-query"

import { messageService } from "@/services/message.service"

import { useListenMessages } from "@/hooks/useListenMessages"

import { Message as MessageType } from "@/types"

import { ScrollArea } from "../ui/scroll-area"

import { Message } from "./Message"
import useConversation from "@/store/useConversation"

export const Messages = ({ conversationId }: { conversationId: string }) => {
  const { setMessages, messages } = useConversation()

  const { isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const messages = await messageService.getMessages(conversationId)
      setMessages(messages)
    }
  })

  useListenMessages()

  return (
    <ScrollArea className="h-screen">
      <div className="space-y-2 px-10 py-4">
        {!isLoading &&
          messages?.map((message: MessageType) => (
            <Message
              key={message.id}
              message={message}
            />
          ))}

        {!isLoading && messages?.length === 0 && (
          <p className="text-center text-white">
            Send a message to start the conversation
          </p>
        )}
      </div>
    </ScrollArea>
  )
}
