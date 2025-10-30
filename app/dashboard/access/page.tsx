"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserPlus } from "lucide-react"

const users = [
  { name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
  { name: "Jane Smith", email: "jane@example.com", role: "Developer", status: "active" },
  { name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "active" },
  { name: "Alice Williams", email: "alice@example.com", role: "Developer", status: "inactive" },
]

export default function AccessPage() {
  return (
    <DashboardLayout activeModule="access">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white neon-glow">Access Control & Permissions</h1>
            <p className="text-muted-foreground mt-2">RBAC setup and team management</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>

        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">Team Members</CardTitle>
            <CardDescription>Manage user access and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/10 rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-muted-foreground text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.role}</Badge>
                    <Button variant="outline" size="sm" className="border-primary/50 text-white bg-transparent">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
