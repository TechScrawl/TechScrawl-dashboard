"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, CheckCircle, XCircle } from "lucide-react"

const integrations = [
  { name: "Stripe API", status: "connected", syncProgress: 100 },
  { name: "SendGrid", status: "connected", syncProgress: 100 },
  { name: "AWS S3", status: "syncing", syncProgress: 67 },
  { name: "Twilio", status: "error", syncProgress: 0 },
  { name: "Google Analytics", status: "connected", syncProgress: 100 },
]

export default function IntegrationPage() {
  return (
    <DashboardLayout activeModule="integration">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white neon-glow">Data Integration Hub</h1>
            <p className="text-muted-foreground mt-2">API integrations and data sync management</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {integrations.map((integration, index) => (
            <Card key={index} className="bg-card border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {integration.status === "connected" && <CheckCircle className="w-5 h-5 text-primary" />}
                    {integration.status === "error" && <XCircle className="w-5 h-5 text-destructive" />}
                    {integration.status === "syncing" && (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    )}
                    <div>
                      <CardTitle className="text-white">{integration.name}</CardTitle>
                      <CardDescription className="mt-1 capitalize">{integration.status}</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-primary/50 text-white bg-transparent">
                    Configure
                  </Button>
                </div>
              </CardHeader>
              {integration.status === "syncing" && (
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sync Progress</span>
                      <span className="text-white">{integration.syncProgress}%</span>
                    </div>
                    <Progress value={integration.syncProgress} />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
