"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { month: "Aug", spending: 2800, income: 5800, savings: 3000 },
  { month: "Sep", spending: 3100, income: 5800, savings: 2700 },
  { month: "Oct", spending: 2900, income: 6200, savings: 3300 },
  { month: "Nov", spending: 3300, income: 5800, savings: 2500 },
  { month: "Dec", spending: 3500, income: 5800, savings: 2300 },
  { month: "Jan", spending: 3241, income: 5800, savings: 2559 },
]

export function SpendingChart() {
  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <CardTitle className="section-title">Spending Overview</CardTitle>
          <Select defaultValue="6-months">
            <SelectTrigger className="w-[140px] h-9 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="3-months">3 Months</SelectItem>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="1-year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="section-content">
        <ChartContainer
          config={{
            spending: {
              label: "Spending",
              color: "#ef4444",
            },
            income: {
              label: "Income",
              color: "#22c55e",
            },
            savings: {
              label: "Savings",
              color: "#3b82f6",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="spending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="savings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="income" stackId="1" stroke="#22c55e" fill="url(#income)" strokeWidth={2} />
              <Area
                type="monotone"
                dataKey="spending"
                stackId="2"
                stroke="#ef4444"
                fill="url(#spending)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="savings"
                stackId="3"
                stroke="#3b82f6"
                fill="url(#savings)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-gray-700">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm font-semibold text-gray-700">Spending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm font-semibold text-gray-700">Savings</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
