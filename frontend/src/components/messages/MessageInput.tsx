"use client"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Send } from "lucide-react"

import { messageService } from "@/services/message.service"

import { Button } from "../ui/button"
import { Form, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"

import { MessageSchema, MessageSchemaType } from "@/schemas"
import useConversation from "@/store/useConversation"

export const MessageInput = ({
  conversationId
}: {
  conversationId: string
}) => {
  const { setMessages, messages } = useConversation()

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["send message"],
    mutationFn: async (message: string) => {
      const newMessage = await messageService.sendMessage(
        conversationId,
        message
      )

      setMessages([...messages, newMessage])
    },
    onSuccess: () => {
      form.reset()
    }
  })

  const form = useForm<MessageSchemaType>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: ""
    }
  })

  const onSubmit = (values: MessageSchemaType) => {
    sendMessage(values.message)
  }

  return (
    <Form {...form}>
      <form
        className="relative px-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Input
                className="h-14 flex-1"
                placeholder="Message"
                {...field}
              />
            </FormItem>
          )}
        />
        <Button
          className="absolute right-5 top-1/2 -translate-y-1/2"
          size={"sm"}
          disabled={isPending}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  )
}
