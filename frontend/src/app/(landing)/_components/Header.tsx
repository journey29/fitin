"use client"

import Link from "next/link"

import { Container } from "@/components/Container"
import { Button } from "@/components/ui/button"

import { useAuth } from "@/hooks/useAuth"

import { SignoutButton } from "./SignoutButton"

export const Header = () => {
  const { data } = useAuth()

  return (
    <header className="fixed left-0 right-0 top-0 bg-background p-4 backdrop-blur-md">
      <Container className="flex items-center justify-between gap-2">
        <Link
          className="text-xl font-bold"
          href="/"
        >
          Fitin
        </Link>
        {data ? (
          <SignoutButton />
        ) : (
          <Button asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
        )}
      </Container>
    </header>
  )
}
