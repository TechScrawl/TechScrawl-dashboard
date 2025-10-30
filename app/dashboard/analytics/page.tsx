"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, TrendingUp, Activity, Zap } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useState, useEffect } from "react"

// Mock data for charts
const cpuData = [
  { time: "00:00", usage: 45, limit: 80 },
  { time: "04:00", usage: 52, limit: 80 },
  { time: "08:00", usage: 68, limit: 80 },
  { time: "12:00", usage: 72, limit: 80 },
  { time: "16:00", usage: 65, limit: 80 },
  { time: "20:00", usage: 58, limit: 80 },
  { time: "24:00", usage: 48, limit: 80 },
]

const memoryData = [
  { time: "00:00", usage: 35 },
  { time: "04:00", usage: 42 },
  { time: "08:00", usage: 55 },
  { time: "12:00", usage: 68 },
  { time: "16:00", usage: 62 },
  { time: "20:00", usage: 48 },
  { time: "24:00", usage: 38 },
]

const bandwidthData = [
  { time: "00:00", in: 120, out: 90 },
  { time: "04:00", in: 150, out: 110 },
  { time: "08:00", in: 220, out: 180 },
  { time: "12:00", in: 280, out: 240 },
  { time: "16:00", in: 250, out: 200 },
  { time: "20:00", in: 180, out: 140 },
  { time: "24:00", in: 130, out: 100 },
]

const performanceData = [
  { name: "Excellent", value: 45, color: "#00FF00" },
  { name: "Good", value: 35, color: "#FFF287" },
  { name: "Fair", value: 15, color: "#C83F12" },
  { name: "Poor", value: 5, color: "#8A0000" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#3B060A] border border-[#C83F12] rounded-lg p-3 shadow-lg shadow-[#C83F12]/50">
        <p className="text-[#FFF287] text-sm font-bold">{payload[0].payload.time || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-xs">
            {entry.name}: {entry.value}
            {entry.name.includes("usage") || entry.name.includes("in") || entry.name.includes("out") ? "%" : ""}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [animateCards, setAnimateCards] = useState(false)

  useEffect(() => {
    setAnimateCards(true)
  }, [])

  return (
    <DashboardLayout activeModule="analytics">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white neon-glow mb-2">Usage & Performance Analytics</h1>
            <p className="text-[#FFF287]/70">Real-time monitoring with predictive insights and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-gradient-to-r from-[#C83F12] to-[#FFF287] text-black hover:shadow-lg hover:shadow-[#C83F12]/50 transition-all">
              <FileText className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button className="bg-gradient-to-r from-[#8A0000] to-[#C83F12] text-white hover:shadow-lg hover:shadow-[#C83F12]/50 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Avg CPU Usage",
              value: "62%",
              trend: "+5%",
              icon: Activity,
              color: "from-[#C83F12] to-[#FFF287]",
            },
            { label: "Memory Usage", value: "52%", trend: "-3%", icon: Zap, color: "from-[#8A0000] to-[#C83F12]" },
            {
              label: "Network I/O",
              value: "185 Mbps",
              trend: "+12%",
              icon: TrendingUp,
              color: "from-[#FFF287] to-[#C83F12]",
            },
            {
              label: "System Health",
              value: "98.5%",
              trend: "+0.5%",
              icon: Activity,
              color: "from-[#3B060A] to-[#8A0000]",
            },
          ].map((kpi, index) => {
            const Icon = kpi.icon
            return (
              <div
                key={index}
                className={`relative group transform transition-all duration-500 ${animateCards ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${kpi.color} rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                ></div>
                <Card className="relative bg-gradient-to-br from-[#3B060A] to-[#1a0305] border border-[#C83F12]/30 hover:border-[#C83F12] transition-all hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${kpi.color}`}>
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.trend.startsWith("+") ? "bg-[#C83F12]/20 text-[#FFF287]" : "bg-[#00FF00]/20 text-[#00FF00]"}`}
                      >
                        {kpi.trend}
                      </span>
                    </div>
                    <p className="text-[#FFF287]/70 text-sm mb-1">{kpi.label}</p>
                    <p className="text-3xl font-bold text-white">{kpi.value}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CPU Usage Chart */}
          <Card className="bg-gradient-to-br from-[#3B060A] to-[#1a0305] border border-[#C83F12]/30 hover:border-[#C83F12] transition-all hover-lift">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#C83F12] to-[#FFF287] animate-pulse"></div>
                CPU Usage
              </CardTitle>
              <CardDescription className="text-[#FFF287]/70">Last 24 hours performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={cpuData}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C83F12" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#C83F12" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#C83F12/20" />
                  <XAxis dataKey="time" stroke="#FFF287/50" />
                  <YAxis stroke="#FFF287/50" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="usage" stroke="#C83F12" fillOpacity={1} fill="url(#colorUsage)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Memory Usage Chart */}
          <Card className="bg-gradient-to-br from-[#3B060A] to-[#1a0305] border border-[#C83F12]/30 hover:border-[#C83F12] transition-all hover-lift">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#8A0000] to-[#C83F12] animate-pulse"></div>
                Memory Usage
              </CardTitle>
              <CardDescription className="text-[#FFF287]/70">RAM allocation over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={memoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#C83F12/20" />
                  <XAxis dataKey="time" stroke="#FFF287/50" />
                  <YAxis stroke="#FFF287/50" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="usage"
                    stroke="#8A0000"
                    strokeWidth={3}
                    dot={{ fill: "#FFF287", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Network Bandwidth Chart */}
          <Card className="bg-gradient-to-br from-[#3B060A] to-[#1a0305] border border-[#C83F12]/30 hover:border-[#C83F12] transition-all hover-lift">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FFF287] to-[#C83F12] animate-pulse"></div>
                Network Bandwidth
              </CardTitle>
              <CardDescription className="text-[#FFF287]/70">Inbound & Outbound traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bandwidthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#C83F12/20" />
                  <XAxis dataKey="time" stroke="#FFF287/50" />
                  <YAxis stroke="#FFF287/50" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#FFF287" }} />
                  <Bar dataKey="in" fill="#C83F12" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="out" fill="#8A0000" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Distribution */}
          <Card className="bg-gradient-to-br from-[#3B060A] to-[#1a0305] border border-[#C83F12]/30 hover:border-[#C83F12] transition-all hover-lift">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00FF00] to-[#FFF287] animate-pulse"></div>
                Performance Distribution
              </CardTitle>
              <CardDescription className="text-[#FFF287]/70">System health breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-[#FFF287]/70">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictive Alerts */}
        <Card className="bg-gradient-to-br from-[#3B060A] to-[#1a0305] border border-[#C83F12]/30 hover:border-[#C83F12] transition-all hover-lift">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FFF287]" />
              Predictive Alerts & Recommendations
            </CardTitle>
            <CardDescription className="text-[#FFF287]/70">AI-powered insights for system optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  type: "warning",
                  title: "High Memory Usage Predicted",
                  desc: "Memory usage expected to reach 85% in 2 hours",
                  icon: "⚠️",
                },
                {
                  type: "info",
                  title: "Database Connection Pool",
                  desc: "Connection pool may reach limit during peak hours",
                  icon: "ℹ️",
                },
                {
                  type: "success",
                  title: "CPU Optimization",
                  desc: "Recent optimizations reduced CPU usage by 12%",
                  icon: "✓",
                },
                {
                  type: "alert",
                  title: "Network Spike Detected",
                  desc: "Unusual network activity detected, investigating...",
                  icon: "🔔",
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-lg ${
                    alert.type === "warning"
                      ? "bg-[#C83F12]/10 border-[#C83F12] hover:shadow-[#C83F12]/50"
                      : alert.type === "success"
                        ? "bg-[#00FF00]/10 border-[#00FF00] hover:shadow-[#00FF00]/50"
                        : alert.type === "alert"
                          ? "bg-[#8A0000]/10 border-[#8A0000] hover:shadow-[#8A0000]/50"
                          : "bg-[#FFF287]/10 border-[#FFF287] hover:shadow-[#FFF287]/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{alert.icon}</span>
                    <div>
                      <p className="font-bold text-white">{alert.title}</p>
                      <p className="text-sm text-[#FFF287]/70 mt-1">{alert.desc}</p>
                    </div>
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
