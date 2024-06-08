import { useQuery } from "@tanstack/react-query"

import { authService } from "@/services/auth.service"

export const useAuth = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => authService.getUserInfo()
  })

  return { data, error, isLoading }
}
