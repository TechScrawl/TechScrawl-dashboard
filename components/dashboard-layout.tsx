"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Network,
  Cpu,
  BarChart3,
  Workflow,
  Shield,
  Database,
  Globe,
  Users,
  Bell,
  Search,
  Menu,
  X,
  Settings,
  LogOut,
  User,
  Zap,
} from "lucide-react"
import Image from "next/image"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeModule?: string
}

const modules = [
  { id: "orchestration", name: "AI Orchestration", icon: Cpu, color: "from-[#C83F12] to-[#FFF287]" },
  { id: "control", name: "Multi-App Control", icon: Network, color: "from-[#8A0000] to-[#C83F12]" },
  { id: "analytics", name: "Analytics", icon: BarChart3, color: "from-[#FFF287] to-[#C83F12]" },
  { id: "workflow", name: "Workflow Automation", icon: Workflow, color: "from-[#C83F12] to-[#8A0000]" },
  { id: "security", name: "Security", icon: Shield, color: "from-[#3B060A] to-[#8A0000]" },
  { id: "integration", name: "Data Integration", icon: Database, color: "from-[#8A0000] to-[#FFF287]" },
  { id: "deployment", name: "Deployment", icon: Globe, color: "from-[#C83F12] to-[#3B060A]" },
  { id: "access", name: "Access Control", icon: Users, color: "from-[#FFF287] to-[#8A0000]" },
  { id: "monitoring", name: "Monitoring", icon: Bell, color: "from-[#8A0000] to-[#C83F12]" },
]

export function DashboardLayout({ children, activeModule }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications] = useState(7)
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#C83F12] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <Zap className="w-8 h-8 text-[#FFF287] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-[#FFF287] text-lg font-bold">Loading TechScrawl...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#3B060A] via-[#8A0000] to-[#3B060A] backdrop-blur-xl border-b border-[#C83F12]/30 z-50 shadow-lg shadow-[#C83F12]/20">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-[#FFF287] hover:bg-[#8A0000]/50"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className=""></div>
                <Image
                  src="/logo.png"
                  alt="TechScrawl"
                  width={200}
                  height={100}
                  className=""
                />
              </div>
             
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-[#3B060A] rounded-lg px-3 py-2 w-64 border border-[#C83F12]/30 hover:border-[#C83F12] transition-colors">
              <Search className="w-4 h-4 text-[#FFF287]" />
              <Input
                placeholder="Search modules..."
                className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-[#FFF287] placeholder:text-[#FFF287]/50"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#FFF287] hover:bg-[#8A0000]/50 transition-all"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#C83F12] to-[#FFF287] rounded-full text-xs flex items-center justify-center text-black font-bold animate-pulse">
                  {notifications}
                </span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-[#FFF287] hover:bg-[#8A0000]/50">
                  <Avatar className="w-8 h-8 border-2 border-[#C83F12] shadow-lg shadow-[#C83F12]/50">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-[#3B060A] to-[#8A0000] text-[#FFF287] font-bold">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium">{user.displayName || "User"}</p>
                    <p className="text-xs text-[#FFF287]/70">Admin</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#3B060A] border-[#C83F12]/30">
                <DropdownMenuLabel className="text-[#FFF287]">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#C83F12]/30" />
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="text-[#FFF287] cursor-pointer hover:bg-[#8A0000]/50"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/settings")}
                  className="text-[#FFF287] cursor-pointer hover:bg-[#8A0000]/50"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#C83F12]/30" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-[#C83F12] cursor-pointer hover:bg-[#C83F12]/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-16 bottom-0 w-72 bg-gradient-to-b from-[#3B060A] via-black to-[#3B060A] border-r border-[#C83F12]/30 transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto`}
      >
        <div className="p-4">
          <div className="mb-6 pb-4 border-b border-[#C83F12]/30">
            <h2 className="text-[#FFF287] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Control Modules
            </h2>
          </div>

          <nav className="space-y-2">
            {modules.map((module, index) => {
              const Icon = module.icon
              const isActive = activeModule === module.id
              return (
                <div key={module.id} className="relative group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${
                      isActive ? "opacity-75" : ""
                    }`}
                  ></div>

                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 relative overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#8A0000] to-[#C83F12] text-[#FFF287] shadow-lg shadow-[#C83F12]/50"
                        : "text-[#FFF287]/70 hover:text-[#FFF287] hover:bg-[#8A0000]/30"
                    }`}
                    onClick={() => {
                      router.push(`/dashboard/${module.id}`)
                      setSidebarOpen(false)
                    }}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF287]/10 to-transparent animate-shimmer"></div>
                    )}

                    <div
                      className={`relative p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-br ${module.color}`
                          : "bg-[#3B060A] group-hover:bg-gradient-to-br group-hover:" + module.color
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-black" : "text-[#FFF287]"}`} />
                    </div>

                    <div className="flex-1 text-left">
                      <span className="font-medium">{module.name}</span>
                      <div className="text-xs opacity-50">Module {String(index + 1).padStart(2, "0")}</div>
                    </div>

                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-[#FFF287] animate-pulse shadow-lg shadow-[#FFF287]/50"></div>
                    )}
                  </Button>
                </div>
              )
            })}
          </nav>

          <div className="mt-8 pt-4 border-t border-[#C83F12]/30">
            <div className="bg-gradient-to-r from-[#3B060A] to-[#8A0000] rounded-lg p-4 border border-[#C83F12]/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse"></div>
                <span className="text-[#FFF287] text-sm font-bold">System Status</span>
              </div>
              <p className="text-[#FFF287]/70 text-xs">All systems operational</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 min-h-screen">
        <div className="p-6">{children}</div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
