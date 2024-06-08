import { Home } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import { AddConversation } from "./AddConversation"

export const Topbar = () => {
  return (
    <div className="flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-1"
      >
        <Home className="h-6 w-6 duration-150 hover:text-darkOrange" />
      </Link>
      <ConversationDialog />
    </div>
  )
}

const ConversationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2">
          <DialogTitle>Type email of contact</DialogTitle>
          <DialogDescription className="text-xs">
            Contacts that already in convo with you will not be added!
          </DialogDescription>
        </DialogHeader>
        <AddConversation />
      </DialogContent>
    </Dialog>
  )
}
