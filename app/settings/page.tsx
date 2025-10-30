"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { user, loading, updateUserProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [displayName, setDisplayName] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
    if (user) {
      setDisplayName(user.displayName || "")
      setPhotoURL(user.photoURL || "")
    }
  }, [user, loading, router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateUserProfile(displayName, photoURL)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading || !user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground neon-glow">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-xl border-primary/30 neon-border">
          <CardHeader>
            <CardTitle className="text-foreground">Profile Settings</CardTitle>
            <CardDescription className="text-muted-foreground">Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-foreground">
                  Display Name
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoURL" className="text-foreground">
                  Photo URL
                </Label>
                <Input
                  id="photoURL"
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="bg-input border-border text-foreground opacity-50"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-border"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
