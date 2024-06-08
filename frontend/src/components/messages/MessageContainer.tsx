"use client"

import { useAuth } from "@/hooks/useAuth"

import { Skeleton } from "../ui/skeleton"

import { MessageInput } from "./MessageInput"
import { Messages } from "./Messages"
import useConversation from "@/store/useConversation"

const MessageContainer = () => {
  const { selectedConversation } = useConversation()

  return (
    <div className="flex h-full w-full flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="mb-2 space-x-1 bg-primary px-4 py-2 text-black">
            <span className="text-xs">to:</span>
            <span className="text-sm">{selectedConversation.name}</span>
          </div>

          <Messages conversationId={selectedConversation.id} />
          <MessageInput conversationId={selectedConversation.id} />
        </>
      )}
    </div>
  )
}
export default MessageContainer

const NoChatSelected = () => {
  const { data: authUser, isLoading } = useAuth()

  return (
    <div className="flex h-full w-full items-center justify-center">
      {isLoading ? (
        <div className="flex flex-col items-center gap-2 px-4">
          <Skeleton className="h-14 w-96 p-5"></Skeleton>
          <Skeleton className="h-6 w-80 p-5" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 px-4 text-center text-gray-200">
          <p className="font-semibold sm:text-lg md:text-xl">
            Welcome {authUser.name}!
          </p>
          <p className="text-xs">Select or add a chat to start messaging</p>
        </div>
      )}
    </div>
  )
}
