"use client"

import { useQuery } from "@tanstack/react-query"

import { Conversation } from "@/components/conversations/Conversation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

import { conversationService } from "@/services/conversation.service"

import { Conversation as ConversationType } from "@/types"

import { Topbar } from "./Topbar"

export const Conversations = () => {
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => conversationService.getConversations()
  })

  return (
    <div className="h-full space-y-5">
      <Topbar />
      <ScrollArea className="h-5/6">
        <div className="flex flex-col gap-2">
          {isLoading
            ? new Array(5)
                .fill(null)
                .map((_, index) => <ConversationSkeleton key={index} />)
            : conversations?.map((conversation: ConversationType) => (
                <Conversation
                  id={conversation.id}
                  email={conversation.email}
                  name={conversation.name}
                  key={conversation.id}
                />
              ))}
        </div>
      </ScrollArea>
    </div>
  )
}

const ConversationSkeleton = () => {
  return (
    <Skeleton className="flex items-start gap-2 rounded-lg p-3">
      <Skeleton className="h-10 w-10 rounded-full" />
    </Skeleton>
  )
}
