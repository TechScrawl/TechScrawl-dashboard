"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

const apps = [
  { name: "API Gateway", status: "healthy", uptime: "99.9%", requests: "1.2M" },
  { name: "Auth Service", status: "healthy", uptime: "99.8%", requests: "850K" },
  { name: "Database Cluster", status: "warning", uptime: "98.5%", requests: "2.1M" },
  { name: "Cache Layer", status: "healthy", uptime: "99.9%", requests: "3.5M" },
  { name: "ML Pipeline", status: "healthy", uptime: "99.7%", requests: "450K" },
  { name: "Analytics Engine", status: "error", uptime: "95.2%", requests: "680K" },
]

export default function ControlPage() {
  return (
    <DashboardLayout activeModule="control">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white neon-glow">Multi-App Control Center</h1>
          <p className="text-muted-foreground mt-2">Unified dashboard for cross-app performance monitoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app, index) => (
            <Card key={index} className="bg-card border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{app.name}</CardTitle>
                  {app.status === "healthy" && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  {app.status === "warning" && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                  {app.status === "error" && <XCircle className="w-5 h-5 text-destructive" />}
                </div>
                <CardDescription>
                  <Badge
                    variant={
                      app.status === "healthy" ? "default" : app.status === "warning" ? "secondary" : "destructive"
                    }
                    className="mt-2"
                  >
                    {app.status}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="text-white font-medium">{app.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Requests</span>
                    <span className="text-white font-medium">{app.requests}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
