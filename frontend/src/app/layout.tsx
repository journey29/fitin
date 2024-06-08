import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"

import { QueryProvider, SocketProvider } from "../components/Providers"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FitIn",
  description:
    "Communicate, exchange and explore yourself in domain of sharing!",
  icons: [{ rel: "icon", url: "/logo.svg" }]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <SocketProvider>{children}</SocketProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}
