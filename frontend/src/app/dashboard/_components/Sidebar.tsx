import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"

import { Conversations } from "../../../components/conversations/Conversations"

export const Sidebar = () => {
  return (
    <div className="w-full border-r p-5 sm:bg-background">
      <Conversations />
    </div>
  )
}

export default Sidebar
