"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const data = [
  { month: "Aug", income: 5800, expenses: 2800, net: 3000 },
  { month: "Sep", income: 5800, expenses: 3100, net: 2700 },
  { month: "Oct", income: 6200, expenses: 2900, net: 3300 },
  { month: "Nov", income: 5800, expenses: 3300, net: 2500 },
  { month: "Dec", income: 5800, expenses: 3500, net: 2300 },
  { month: "Jan", income: 5800, expenses: 3241, net: 2559 },
]

export function IncomeVsExpenses() {
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0)
  const savingsRate = (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)

  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="section-title">Income vs Expenses</CardTitle>
            <div className="flex items-center gap-3">
              <Badge className="status-success font-semibold">{savingsRate}% Savings Rate</Badge>
              <span className="text-sm text-gray-600 font-medium">
                Net: ${(totalIncome - totalExpenses).toLocaleString()}
              </span>
            </div>
          </div>
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
            income: {
              label: "Income",
              color: "#22c55e",
            },
            expenses: {
              label: "Expenses",
              color: "#ef4444",
            },
            net: {
              label: "Net",
              color: "#3b82f6",
            },
          }}
          className="h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Summary Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200/60">
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60">
            <div className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-1">Total Income</div>
            <div className="text-xl font-black text-green-700">${totalIncome.toLocaleString()}</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/60">
            <div className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-1">Total Expenses</div>
            <div className="text-xl font-black text-red-700">${totalExpenses.toLocaleString()}</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-1">Net Savings</div>
            <div className="text-xl font-black text-blue-700">${(totalIncome - totalExpenses).toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
