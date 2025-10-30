"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Lock, Mail, User, ArrowRight } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, name)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/futuristic-ai-neural-network-with-red-and-orange-d.jpg" alt="Background" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#8A0000]/70 to-black"></div>
      </div>

      <div className="absolute inset-0 opacity-30 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C83F12]/40 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#8A0000]/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-[#FFF287]/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <Card className="w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-2xl border-[#C83F12]/40 neon-border relative z-10 shadow-2xl shadow-[#C83F12]/20">
        <CardHeader className="space-y-6 text-center pb-6">
          <div className="flex justify-center">
            <div className="relative group">
              <div className=""></div>
              <div className="">
                <Image
                  src="/logo.png"
                  alt="TechScrawl Logo"
                  width={200}
                  height={100}
                  className=""
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
           
            <CardDescription className="text-[#FFF287]/70 text-lg font-medium">
              Start orchestrating AI-powered applications
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-[#C83F12]/20 border border-[#C83F12]/50 rounded-lg text-[#FFF287] text-sm whitespace-pre-line backdrop-blur-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#FFF287] text-base font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C83F12]" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-11 bg-[#1a1a1a]/80 border-[#8A0000]/50 text-[#FFF287] placeholder:text-[#FFF287]/40 h-12 rounded-lg focus:border-[#C83F12] focus:ring-[#C83F12]/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#FFF287] text-base font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C83F12]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-11 bg-[#1a1a1a]/80 border-[#8A0000]/50 text-[#FFF287] placeholder:text-[#FFF287]/40 h-12 rounded-lg focus:border-[#C83F12] focus:ring-[#C83F12]/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#FFF287] text-base font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C83F12]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-11 bg-[#1a1a1a]/80 border-[#8A0000]/50 text-[#FFF287] placeholder:text-[#FFF287]/40 h-12 rounded-lg focus:border-[#C83F12] focus:ring-[#C83F12]/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#FFF287] text-base font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C83F12]" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-11 bg-[#1a1a1a]/80 border-[#8A0000]/50 text-[#FFF287] placeholder:text-[#FFF287]/40 h-12 rounded-lg focus:border-[#C83F12] focus:ring-[#C83F12]/20"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#C83F12] to-[#8A0000] text-[#FFF287] hover:from-[#8A0000] hover:to-[#C83F12] font-bold text-lg h-12 neon-border shadow-lg shadow-[#C83F12]/30 transition-all duration-300 group"
              disabled={loading}
            >
              {loading ? (
                "Creating account..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#8A0000]/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0a0a0a] text-[#FFF287]/60">Already have an account?</span>
              </div>
            </div>

            <Link href="/login" className="block">
              <Button
                type="button"
                variant="outline"
                className="w-full border-[#C83F12]/50 text-[#FFF287] hover:bg-[#C83F12]/10 hover:border-[#C83F12] font-semibold h-12 transition-all duration-300 bg-transparent"
              >
                Sign In
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
