"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const workflows = [
  { name: "Daily Data Sync", trigger: "Schedule", status: "Active", lastRun: "2 hours ago" },
  { name: "Error Alert Pipeline", trigger: "Event", status: "Active", lastRun: "5 minutes ago" },
  { name: "Weekly Report Generation", trigger: "Schedule", status: "Active", lastRun: "1 day ago" },
  { name: "User Onboarding Flow", trigger: "Event", status: "Paused", lastRun: "3 hours ago" },
]

export default function WorkflowPage() {
  return (
    <DashboardLayout activeModule="workflow">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white neon-glow">Workflow Automation</h1>
            <p className="text-muted-foreground mt-2">Visual workflow builder and trigger-based automation</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {workflows.map((workflow, index) => (
            <Card key={index} className="bg-card border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{workflow.name}</CardTitle>
                    <CardDescription className="mt-1">
                      Trigger: {workflow.trigger} • Last run: {workflow.lastRun}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        workflow.status === "Active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {workflow.status}
                    </span>
                    <Button variant="outline" size="sm" className="border-primary/50 text-white bg-transparent">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
