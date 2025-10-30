"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Calendar, Shield } from "lucide-react"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground neon-glow">Profile</h1>
          <p className="text-muted-foreground mt-2">View your account information</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-xl border-primary/30 neon-border">
          <CardHeader>
            <CardTitle className="text-foreground">Account Details</CardTitle>
            <CardDescription className="text-muted-foreground">Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-2 border-primary">
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-[#3B060A] to-[#8A0000] text-foreground text-2xl font-bold">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{user.displayName || "User"}</h3>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Administrator
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-md border border-border">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-md border border-border">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-foreground font-medium">
                    {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
