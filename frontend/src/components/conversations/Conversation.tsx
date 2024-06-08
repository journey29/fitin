import { useSocketContext } from "../Providers"

import useConversation from "@/store/useConversation"

type ConversationType = {
  id: string
  name: string
  email: string
}

export const Conversation = ({ id, name, email }: ConversationType) => {
  const { setSelectedConversation } = useConversation()
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(id)

  return (
    <div
      className="flex w-full max-w-64 cursor-pointer items-start gap-2 rounded-lg bg-secondary p-3"
      onClick={() => setSelectedConversation({ id, name, email })}
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary p-5 font-bold text-black">
        {name.charAt(0)}
        {isOnline && (
          <div className="absolute right-0 top-1 h-2 w-2 rounded-full bg-green-600"></div>
        )}
      </div>
      <div className="overflow-hidden">
        <p className="text-sm">{name}</p>
        <p className="truncate text-xs font-light">{email}</p>
      </div>
    </div>
  )
}
