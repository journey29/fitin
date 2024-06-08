import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (dateString: number) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
