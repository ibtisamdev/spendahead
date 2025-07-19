"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Aug", spending: 2800, income: 5800, savings: 3000 },
  { month: "Sep", spending: 3100, income: 5800, savings: 2700 },
  { month: "Oct", spending: 2900, income: 6200, savings: 3300 },
  { month: "Nov", spending: 3300, income: 5800, savings: 2500 },
  { month: "Dec", spending: 3500, income: 5800, savings: 2300 },
  { month: "Jan", spending: 3241, income: 5800, savings: 2559 },
]

export function SpendingChart() {
  const currentMonth = data[data.length - 1]
  const previousMonth = data[data.length - 2]
  const spendingChange = ((currentMonth.spending - previousMonth.spending) / previousMonth.spending) * 100
  const incomeChange = ((currentMonth.income - previousMonth.income) / previousMonth.income) * 100
  const savingsChange = ((currentMonth.savings - previousMonth.savings) / previousMonth.savings) * 100

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-xl p-4 shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {entry.name}: ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="section-title">Spending Overview</CardTitle>
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50/80 border border-emerald-200/60">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">+12.5% vs last month</span>
            </div>
          </div>
          <Select defaultValue="6-months">
            <SelectTrigger className="w-[140px] h-10 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
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
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-red-700">Total Spending</span>
              <DollarSign className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-2xl font-black text-red-700">${currentMonth.spending.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              {spendingChange > 0 ? (
                <TrendingUp className="h-3 w-3 text-red-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-600" />
              )}
              <span className={`text-xs font-semibold ${spendingChange > 0 ? "text-red-600" : "text-green-600"}`}>
                {spendingChange > 0 ? "+" : ""}{spendingChange.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-emerald-700">Total Income</span>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700">${currentMonth.income.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              {incomeChange > 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={`text-xs font-semibold ${incomeChange > 0 ? "text-emerald-600" : "text-red-600"}`}>
                {incomeChange > 0 ? "+" : ""}{incomeChange.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-700">Total Savings</span>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-blue-700">${currentMonth.savings.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              {savingsChange > 0 ? (
                <TrendingUp className="h-3 w-3 text-blue-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={`text-xs font-semibold ${savingsChange > 0 ? "text-blue-600" : "text-red-600"}`}>
                {savingsChange > 0 ? "+" : ""}{savingsChange.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Chart - Now Fully Responsive */}
        <div className="w-full h-[400px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="income"
                stackId="1"
                stroke="#22c55e"
                fill="url(#income)"
                strokeWidth={2}
                name="Income"
              />
              <Area
                type="monotone"
                dataKey="spending"
                stackId="2"
                stroke="#ef4444"
                fill="url(#spending)"
                strokeWidth={2}
                name="Spending"
              />
              <Area
                type="monotone"
                dataKey="savings"
                stackId="3"
                stroke="#3b82f6"
                fill="url(#savings)"
                strokeWidth={2}
                name="Savings"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Responsive Legend */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/60">
            <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm" />
            <div>
              <span className="text-sm font-semibold text-emerald-700">Income</span>
              <div className="text-xs text-emerald-600">${currentMonth.income.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/60">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm" />
            <div>
              <span className="text-sm font-semibold text-red-700">Spending</span>
              <div className="text-xs text-red-600">${currentMonth.spending.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60">
            <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm" />
            <div>
              <span className="text-sm font-semibold text-blue-700">Savings</span>
              <div className="text-xs text-blue-600">${currentMonth.savings.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
