"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"

import Error from "@/components/Error"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { authService } from "@/services/auth.service"

import { UserAuth } from "@/types"

import { RegisterSchema, RegisterSchemaType } from "../../../schemas"

export const RegisterForm = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })
  const { mutateAsync: register, isPending } = useMutation({
    mutationFn: (data: UserAuth) => authService.main("register", data),
    onSuccess: () => {
      router.push("/")
      form.reset()
    },
    onError: (data: any) => {
      const response = data.response?.data
      setError(response.message)
    }
  })

  const onSubmit = async (values: RegisterSchemaType) => {
    await register(values)
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Dave"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john@example.com"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Link
                className="text-xs"
                href="/auth/login"
              >
                Already have an account?
              </Link>
            </div>
            <Button
              type="submit"
              disabled={isPending}
            >
              Register
            </Button>
            <Error message={error} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
