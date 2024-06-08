import React from "react"

const Error = ({ message }: { message: string | null }) => {
  if (!message) return null

  return <div className="rounded-md bg-destructive p-2 text-sm">{message}</div>
}

export default Error
