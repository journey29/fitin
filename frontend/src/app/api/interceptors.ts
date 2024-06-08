import axios, { CreateAxiosDefaults } from "axios"

import {
  getAccessToken,
  removeTokenStorage
} from "@/services/auth-token.service"
import { authService } from "@/services/auth.service"

const options: CreateAxiosDefaults = {
  baseURL: process.env.BASE_URL || "https://fitin-server.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
}

export const axiosDefault = axios.create(options)
export const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken()

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosWithAuth.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        removeTokenStorage()
      }
    }

    return Promise.reject(error)
  }
)
