import Cookie from "js-cookie"

import { Tokens } from "@/types"

export const getAccessToken = () => {
  const accessToken = Cookie.get(Tokens.ACCESSTOKEN)

  return accessToken
}

export const getRefreshToken = () => {
  const refreshToken = Cookie.get(Tokens.REFRESHTOKEN)

  return refreshToken
}

export const saveTokenStorage = (accessToken: string) => {
  Cookie.set(Tokens.ACCESSTOKEN, accessToken)
}

export const removeTokenStorage = () => {
  Cookie.remove(Tokens.ACCESSTOKEN)
}
