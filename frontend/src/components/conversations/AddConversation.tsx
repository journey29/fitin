"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check } from "lucide-react"

import Error from "@/components/Error"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

import { cn } from "@/lib/utils"

import { conversationService } from "@/services/conversation.service"
import { userService } from "@/services/user.service"

import { User } from "@/types"

import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

import { ContactSchema, ContactSchemaType } from "@/schemas"

export function AddConversation() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getUsers()
  })

  const { mutateAsync: addContact, isPending } = useMutation({
    mutationKey: ["add contact"],
    mutationFn: (email: string) => conversationService.addConversation(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] })
      toast({
        title: "Contact is added!"
      })
    },
    onError: (data: any) => {
      const response = data.response?.data
      setError(response?.message || "An error occurred")
    }
  })

  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      id: ""
    }
  })

  const onSubmit = async (values: ContactSchemaType) => {
    await addContact(values.id)
  }

  const emailValue = form.watch("id")
  const isDisabled = isPending || isLoading || emailValue === ""

  const filteredUsers = useMemo(() => {
    return users?.filter(user =>
      user.email.toLowerCase().includes(emailValue.toLowerCase())
    )
  }, [emailValue, users])

  return (
    <Form {...form}>
      <form
        className="space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="User email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {isLoading ? (
            <p className="my-2 text-xs">Loading..</p>
          ) : (
            <ScrollArea
              className={cn("hidden h-20", "", {
                block: !!filteredUsers?.length
              })}
            >
              <div className="space-y-1 py-2 pr-4">
                {filteredUsers?.map((user: User) => (
                  <div
                    className="flex items-center justify-between rounded-md bg-secondary p-2"
                    key={user.id}
                    onClick={() => form.setValue("id", user.id)}
                  >
                    <p className="text-xs">{user.email}</p>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        emailValue === user.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {!filteredUsers?.length ||
            (!users?.length && <p className="text-sm">There is no users!</p>)}
        </div>
        <Button
          type="submit"
          disabled={isDisabled}
        >
          Add
        </Button>
        <Error message={error} />
      </form>
    </Form>
  )
}
