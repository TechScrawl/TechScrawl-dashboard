"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function SecurityPage() {
  return (
    <DashboardLayout activeModule="security">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white neon-glow">Security & Compliance</h1>
          <p className="text-muted-foreground mt-2">Automated vulnerability scanning and threat detection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">Security Score</CardTitle>
              <Shield className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">94/100</div>
              <p className="text-xs text-muted-foreground mt-1">Excellent</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">Vulnerabilities</CardTitle>
              <AlertTriangle className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-muted-foreground mt-1">2 medium, 1 low</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">Compliance</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">100%</div>
              <p className="text-xs text-muted-foreground mt-1">All checks passed</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Security Events</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { event: "Failed login attempt detected", severity: "medium", time: "2 hours ago" },
                { event: "SSL certificate renewed", severity: "low", time: "1 day ago" },
                { event: "Firewall rule updated", severity: "low", time: "3 days ago" },
                { event: "Suspicious API request blocked", severity: "high", time: "5 days ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-md">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        item.severity === "high" ? "destructive" : item.severity === "medium" ? "secondary" : "default"
                      }
                    >
                      {item.severity}
                    </Badge>
                    <span className="text-white text-sm">{item.event}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
