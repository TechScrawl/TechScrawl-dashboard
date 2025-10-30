"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, CheckCircle } from "lucide-react"

export default function MonitoringPage() {
  const [systemHealth, setSystemHealth] = useState({
    api: "healthy",
    database: "healthy",
    cache: "warning",
    queue: "healthy",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ["healthy", "warning", "error"]
      setSystemHealth({
        api: statuses[Math.floor(Math.random() * 2)],
        database: statuses[Math.floor(Math.random() * 2)],
        cache: statuses[Math.floor(Math.random() * 3)],
        queue: statuses[Math.floor(Math.random() * 2)],
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <DashboardLayout activeModule="monitoring">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white neon-glow">Monitoring & Alerts</h1>
          <p className="text-muted-foreground mt-2">Live system health and predictive incident detection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(systemHealth).map(([service, status]) => (
            <Card key={service} className="bg-card border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white capitalize">{service}</CardTitle>
                {status === "healthy" && <CheckCircle className="w-4 h-4 text-primary" />}
                {status === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                {status === "error" && <Activity className="w-4 h-4 text-destructive" />}
              </CardHeader>
              <CardContent>
                <Badge variant={status === "healthy" ? "default" : status === "warning" ? "secondary" : "destructive"}>
                  {status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Alerts</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { message: "High CPU usage detected on API server", severity: "warning", time: "10 minutes ago" },
                { message: "Database query performance degraded", severity: "warning", time: "1 hour ago" },
                { message: "Cache hit rate below threshold", severity: "info", time: "3 hours ago" },
                { message: "Successful deployment to production", severity: "success", time: "5 hours ago" },
              ].map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-md">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        alert.severity === "warning"
                          ? "secondary"
                          : alert.severity === "success"
                            ? "default"
                            : "outline"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-white text-sm">{alert.message}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
