"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [user, loading, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"></div>
            <div className="relative p-4 bg-gradient-to-br from-[#3B060A] to-[#8A0000] rounded-lg neon-border">
              <Image src="/logo.png ?key=loading" alt="TechScrawl" width={200} height={60} className="w-200 h-60" />
            </div>
          </div>
        </div>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-foreground text-lg font-semibold neon-glow">Loading TechScrawl...</p>
      </div>
    </div>
  )
}
