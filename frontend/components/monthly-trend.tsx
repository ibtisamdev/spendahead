"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown } from "lucide-react"

const data = [
  { month: "Aug", spending: 2800, budget: 3200, savings: 1000 },
  { month: "Sep", spending: 3100, budget: 3200, savings: 900 },
  { month: "Oct", spending: 2900, budget: 3200, savings: 1100 },
  { month: "Nov", spending: 3300, budget: 3200, savings: 700 },
  { month: "Dec", spending: 3500, budget: 3200, savings: 500 },
  { month: "Jan", spending: 3241, budget: 3200, savings: 759 },
]

export function MonthlyTrend() {
  const currentSpending = data[data.length - 1].spending
  const previousSpending = data[data.length - 2].spending
  const trendPercentage = (((currentSpending - previousSpending) / previousSpending) * 100).toFixed(1)
  const isIncreasing = currentSpending > previousSpending

  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="section-title">Monthly Spending Trend</CardTitle>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-lg ${isIncreasing ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
              >
                {isIncreasing ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-sm font-bold">
                  {isIncreasing ? "+" : ""}
                  {trendPercentage}% vs last month
                </span>
              </div>
              <div className="text-sm text-gray-600 font-medium">Current: ${currentSpending.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="spending">
              <SelectTrigger className="w-[120px] h-9 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="spending">Spending</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
              Compare
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="section-content">
        <ChartContainer
          config={{
            spending: {
              label: "Spending",
              color: "#ef4444",
            },
            budget: {
              label: "Budget",
              color: "#6b7280",
            },
          }}
          className="h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="spending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="budget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b7280" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6b7280" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="budget"
                stroke="#6b7280"
                fill="url(#budget)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Area type="monotone" dataKey="spending" stroke="#ef4444" fill="url(#spending)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200/60">
          <div className="text-center p-4 rounded-xl bg-gray-50/80 backdrop-blur-sm">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Average</div>
            <div className="text-xl font-black text-gray-900">
              ${(data.reduce((sum, item) => sum + item.spending, 0) / data.length).toLocaleString()}
            </div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gray-50/80 backdrop-blur-sm">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Highest</div>
            <div className="text-xl font-black text-red-600">
              ${Math.max(...data.map((item) => item.spending)).toLocaleString()}
            </div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gray-50/80 backdrop-blur-sm">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Lowest</div>
            <div className="text-xl font-black text-green-600">
              ${Math.min(...data.map((item) => item.spending)).toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
