"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Zap, TrendingUp, Cpu, ArrowUpRight, Gauge } from "lucide-react"

export default function OrchestrationPage() {
  const [metrics, setMetrics] = useState({
    resourceUtilization: 78,
    loadBalance: 92,
    selfHealing: 100,
    scalingEfficiency: 85,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        resourceUtilization: Math.floor(Math.random() * 30) + 70,
        loadBalance: Math.floor(Math.random() * 20) + 80,
        selfHealing: Math.floor(Math.random() * 10) + 90,
        scalingEfficiency: Math.floor(Math.random() * 25) + 75,
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const metricCards = [
    {
      label: "Resource Utilization",
      value: metrics.resourceUtilization,
      icon: Activity,
      gradient: "from-[#C83F12] to-[#FFF287]",
      trend: "+2.5%",
    },
    {
      label: "Load Balance",
      value: metrics.loadBalance,
      icon: Zap,
      gradient: "from-[#8A0000] to-[#C83F12]",
      trend: "+1.2%",
    },
    {
      label: "Self-Healing",
      value: metrics.selfHealing,
      icon: TrendingUp,
      gradient: "from-[#FFF287] to-[#C83F12]",
      trend: "+0.8%",
    },
    {
      label: "Scaling Efficiency",
      value: metrics.scalingEfficiency,
      icon: Cpu,
      gradient: "from-[#C83F12] to-[#8A0000]",
      trend: "+3.1%",
    },
  ]

  return (
    <DashboardLayout activeModule="orchestration">
      <div className="space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C83F12]/20 via-transparent to-[#FFF287]/20 blur-3xl rounded-full"></div>
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFF287] via-[#C83F12] to-[#FFF287] bg-clip-text text-transparent animate-pulse">
              AI Orchestration Engine
            </h1>
            <p className="text-[#FFF287]/70 mt-3 text-lg">
              Adaptive resource orchestration with predictive load balancing
            </p>
            <div className="mt-4 h-1 w-32 bg-gradient-to-r from-[#C83F12] to-[#FFF287] rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 -z-10`}
                ></div>

                <Card className="bg-gradient-to-br from-[#3B060A] to-[#1a0a0a] border-[#C83F12]/40 hover:border-[#C83F12]/80 transition-all duration-300 overflow-hidden group-hover:shadow-2xl group-hover:shadow-[#C83F12]/30">
                  <div
                    className={`h-1 bg-gradient-to-r ${metric.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  ></div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm font-medium text-[#FFF287]/80 uppercase tracking-wider">
                          {metric.label}
                        </CardTitle>
                      </div>
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${metric.gradient} shadow-lg shadow-[#C83F12]/50`}
                      >
                        <Icon className="w-5 h-5 text-black" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-bold text-[#FFF287]">{metric.value}%</div>
                      <div className="flex items-center gap-1 text-[#00FF00] text-sm font-semibold">
                        <ArrowUpRight className="w-4 h-4" />
                        {metric.trend}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-2 bg-[#3B060A] rounded-full overflow-hidden border border-[#C83F12]/30">
                        <div
                          className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full transition-all duration-500 shadow-lg shadow-[#C83F12]/50`}
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#FFF287]/50">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C83F12]/20 to-[#8A0000]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <Card className="bg-gradient-to-br from-[#3B060A] to-[#1a0a0a] border-[#C83F12]/40 hover:border-[#C83F12]/80 transition-all duration-300 relative">
            <div className="h-1 bg-gradient-to-r from-[#C83F12] to-[#FFF287]"></div>

            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-[#FFF287]">Workflow Status</CardTitle>
                  <CardDescription className="text-[#FFF287]/60 mt-1">
                    Active AI orchestration workflows
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#00FF00]/20 rounded-full border border-[#00FF00]/50">
                  <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse"></div>
                  <span className="text-[#00FF00] text-sm font-semibold">Live</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {["Data Processing Pipeline", "ML Model Training", "API Gateway Optimization", "Cache Management"].map(
                  (workflow, index) => (
                    <div
                      key={index}
                      className="group/item flex items-center justify-between p-3 rounded-lg bg-[#3B060A]/50 border border-[#C83F12]/20 hover:border-[#C83F12]/60 hover:bg-[#8A0000]/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#C83F12] to-[#FFF287] animate-pulse"></div>
                        <span className="text-[#FFF287] font-medium">{workflow}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-[#FFF287]/50 group-hover/item:text-[#C83F12] transition-colors" />
                        <span className="text-[#00FF00] text-sm font-bold">Active</span>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#3B060A] to-[#1a0a0a] border-[#C83F12]/40 lg:col-span-2">
            <div className="h-1 bg-gradient-to-r from-[#FFF287] to-[#C83F12]"></div>
            <CardHeader>
              <CardTitle className="text-[#FFF287]">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "API Response Time", value: "45ms", status: "optimal" },
                  { label: "Database Query Time", value: "120ms", status: "optimal" },
                  { label: "Cache Hit Rate", value: "94.2%", status: "excellent" },
                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded hover:bg-[#8A0000]/20 transition-colors"
                  >
                    <span className="text-[#FFF287]/80">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFF287] font-bold">{metric.value}</span>
                      <div className="w-2 h-2 rounded-full bg-[#00FF00]"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#3B060A] to-[#1a0a0a] border-[#C83F12]/40">
            <div className="h-1 bg-gradient-to-r from-[#C83F12] to-[#FFF287]"></div>
            <CardHeader>
              <CardTitle className="text-[#FFF287]">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#00FF00] mb-2">98.5%</div>
                <p className="text-[#FFF287]/60 text-sm">Overall System Health</p>
              </div>
              <div className="h-2 bg-[#3B060A] rounded-full overflow-hidden border border-[#C83F12]/30">
                <div className="h-full w-[98.5%] bg-gradient-to-r from-[#00FF00] to-[#FFF287] rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
