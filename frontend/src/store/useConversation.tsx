import { create } from "zustand"

import { Conversation, Message } from "@/types"

interface ConversationState {
  selectedConversation: Conversation | null
  messages: Message[]
  setSelectedConversation: (conversation: Conversation | null) => void
  setMessages: (messages: Message[]) => void
}

const useConversation = create<ConversationState>(set => ({
  selectedConversation: null,
  setSelectedConversation: conversation =>
    set({ selectedConversation: conversation }),
  messages: [],
  setMessages: messages => set({ messages: messages })
}))

export default useConversation
