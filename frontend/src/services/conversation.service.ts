import { Conversation } from "@/types"

import { axiosWithAuth } from "@/app/api/interceptors"

export const conversationService = {
  async getConversations() {
    const response = await axiosWithAuth.get<Conversation[]>("conversation")

    return response.data
  },

  async addConversation(receiverId: string) {
    const reponse = await axiosWithAuth.post(`conversation/add/${receiverId}`)

    return reponse.data
  }
}
