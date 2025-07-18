"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const data = [
  { name: "Food & Dining", value: 35, amount: 1134, color: "#f97316", icon: "🍽️" },
  { name: "Shopping", value: 20, amount: 648, color: "#ec4899", icon: "🛍️" },
  { name: "Transportation", value: 15, amount: 486, color: "#3b82f6", icon: "🚗" },
  { name: "Entertainment", value: 10, amount: 324, color: "#8b5cf6", icon: "🎬" },
  { name: "Utilities", value: 10, amount: 324, color: "#eab308", icon: "⚡" },
  { name: "Health & Fitness", value: 5, amount: 162, color: "#22c55e", icon: "💪" },
  { name: "Housing", value: 5, amount: 162, color: "#6366f1", icon: "🏠" },
]

export function SpendingByCategory() {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="section-title">Spending by Category</CardTitle>
            <p className="text-sm text-gray-600 font-medium">Total: ${totalAmount.toLocaleString()}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl font-semibold"
          >
            Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="section-content">
        <ChartContainer
          config={{
            value: {
              label: "Percentage",
            },
          }}
          className="h-[250px] mb-6"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
                strokeWidth={2}
                stroke="#ffffff"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-gray-200/60">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{data.icon}</span>
                          <span className="font-semibold text-gray-900">{data.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>
                            ${data.amount.toLocaleString()} ({data.value}%)
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="space-y-3">
          {data.slice(0, 4).map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 backdrop-blur-sm hover:bg-gray-100/80 transition-colors duration-300"
            >
              <div className="text-lg">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-gray-900 text-sm truncate">{item.name}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 text-sm">${item.amount}</div>
                <div className="text-xs text-gray-500">{item.value}%</div>
              </div>
            </div>
          ))}
          {data.length > 4 && (
            <Button variant="ghost" className="w-full text-sm text-gray-600 hover:text-gray-900">
              View {data.length - 4} more categories
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
