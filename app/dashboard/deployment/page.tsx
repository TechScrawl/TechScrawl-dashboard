"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const deployments = {
  dev: [
    { version: "v2.3.1-dev", status: "active", deployed: "2 hours ago" },
    { version: "v2.3.0-dev", status: "inactive", deployed: "1 day ago" },
  ],
  staging: [
    { version: "v2.2.5", status: "active", deployed: "5 hours ago" },
    { version: "v2.2.4", status: "inactive", deployed: "3 days ago" },
  ],
  prod: [
    { version: "v2.2.3", status: "active", deployed: "1 week ago" },
    { version: "v2.2.2", status: "inactive", deployed: "2 weeks ago" },
  ],
}

export default function DeploymentPage() {
  return (
    <DashboardLayout activeModule="deployment">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white neon-glow">Global Deployment Manager</h1>
          <p className="text-muted-foreground mt-2">Deployment status tracking and environment overview</p>
        </div>

        <Tabs defaultValue="dev" className="w-full">
          <TabsList className="bg-muted">
            <TabsTrigger
              value="dev"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Development
            </TabsTrigger>
            <TabsTrigger
              value="staging"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Staging
            </TabsTrigger>
            <TabsTrigger
              value="prod"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Production
            </TabsTrigger>
          </TabsList>

          {Object.entries(deployments).map(([env, deploys]) => (
            <TabsContent key={env} value={env} className="space-y-4">
              {deploys.map((deploy, index) => (
                <Card key={index} className="bg-card border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">{deploy.version}</CardTitle>
                        <CardDescription className="mt-1">Deployed {deploy.deployed}</CardDescription>
                      </div>
                      <Badge variant={deploy.status === "active" ? "default" : "secondary"}>{deploy.status}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
