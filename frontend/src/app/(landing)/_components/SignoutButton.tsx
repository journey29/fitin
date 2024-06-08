import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { authService } from "@/services/auth.service"

export const SignoutButton = () => {
  const router = useRouter()

  const { isPending, mutate } = useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      router.push("/auth/login")
    }
  })

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
    >
      Sign out
    </Button>
  )
}
