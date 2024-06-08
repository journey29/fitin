import { Message } from "@/types"

import { axiosWithAuth } from "@/app/api/interceptors"

export const messageService = {
  async getMessages(receiverId: string) {
    const response = await axiosWithAuth.get<Message[]>(`message/${receiverId}`)

    return response.data
  },

  async sendMessage(receiverId: string, body: string) {
    const reponse = await axiosWithAuth.post(`message/send/${receiverId}`, {
      body
    })

    return reponse.data
  }
}
