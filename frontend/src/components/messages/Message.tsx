import { useQuery } from "@tanstack/react-query"

import { cn, formatTime } from "@/lib/utils"

import { userService } from "@/services/user.service"

import { useAuth } from "@/hooks/useAuth"

import { Message as MessageType } from "@/types"

import { Skeleton } from "../ui/skeleton"

export const Message = ({ message }: { message: MessageType }) => {
  const { data: authUser } = useAuth()
  const { data: user, isLoading } = useQuery({
    queryKey: ["sender", message.id],
    queryFn: () => userService.getById(message.senderId)
  })

  return (
    <>
      {isLoading ? (
        <MessageSkeleton />
      ) : (
        <div
          className={cn("flex justify-start", {
            "justify-end": authUser.email !== user?.email
          })}
        >
          <div className="flex w-full max-w-sm items-end gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary p-5 font-bold">
              {user?.name[0]}
            </div>
            <div className="w-full space-y-1 rounded-lg bg-secondary p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs">{formatTime(message.createdAt)}</p>
              </div>
              <p className="text-sm">{message.body}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const MessageSkeleton = () => {
  return (
    <div className="flex w-full max-w-sm items-end gap-4">
      <Skeleton className="flex h-10 w-10 items-center justify-center rounded-full p-5" />
      <Skeleton className="h-20 w-full space-y-1 rounded-lg p-4" />
    </div>
  )
}
