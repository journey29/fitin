import { User } from "@/types"

import { axiosWithAuth } from "@/app/api/interceptors"

export const userService = {
  async getUsers() {
    const response = await axiosWithAuth.get<User[]>("user/all")

    return response.data
  },

  async getById(id: string) {
    const response = await axiosWithAuth.get<User>(`user/${id}`)

    return response.data
  }
}
