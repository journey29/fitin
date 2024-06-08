"use client"

import Link from "next/link"
import TypeWriterText from "typewriter-effect"

import { Button } from "@/components/ui/button"

export const Hero = () => {
  return (
    <div className="text-center">
      <div className="w-full max-w-md space-y-4">
        <div className="text-3xl font-bold sm:text-4xl">
          <h1 className="">Chat application for</h1>
          <div className="from-darkPurple via-darkPink to-darkOrange bg-gradient-to-r bg-clip-text text-transparent">
            <TypeWriterText
              options={{
                strings: ["Communication", "Exchanging", "Exploring"],
                autoStart: true,
                loop: true
              }}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Get started today and unleash your creativity with Fitin
        </p>
        <Button asChild>
          <Link href="/dashboard">Try our service for Free</Link>
        </Button>
      </div>
    </div>
  )
}
