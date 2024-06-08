export type UserAuth = {
  name?: string
  email: string
  password: string
}

export type User = {
  id: string
  name: string
  email: string
  password: string
  conversationIds: string[]
}

export type Conversation = {
  id: string
  name: string
  email: string
}

export type Message = {
  id: string
  body: string
  conversationId: string
  senderId: string
  createdAt: number
  updatedAt: number
}

export enum Tokens {
  ACCESSTOKEN = "accessToken",
  REFRESHTOKEN = "refreshToken"
}

export enum ChatRole {
  User = "user",
  System = "system",
  Assistant = "assistant"
}
