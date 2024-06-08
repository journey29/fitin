import { cn } from "@/lib/utils"

export const Container = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-5", className)}>
      {children}
    </div>
  )
}
