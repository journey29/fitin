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

import { LoginSchema, LoginSchemaType } from "@/schemas"

export const LoginForm = () => {
  const [error, setError] = useState("")

  const router = useRouter()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: (data: UserAuth) => authService.main("login", data),
    onSuccess: () => {
      form.reset()
      router.push("/")
    },
    onError: (data: any) => {
      const response = data.response?.data
      setError(response.message)
    }
  })

  const onSubmit = async (values: LoginSchemaType) => {
    await login(values)
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
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
                href="/auth/register"
              >
                Don&apos;t have an account yet?
              </Link>
            </div>
            <Button
              type="submit"
              disabled={isPending}
            >
              Login
            </Button>
            <Error message={error} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
