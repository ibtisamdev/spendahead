import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

interface BudgetItem {
  id: string
  category: string
  spent: number
  budget: number
  color: string
  icon: string
  gradient: string
  trend: "up" | "down" | "stable"
  trendPercentage: number
}

const budgetData: BudgetItem[] = [
  {
    id: "1",
    category: "Food & Dining",
    spent: 450,
    budget: 600,
    color: "bg-orange-500",
    icon: "🍽️",
    gradient: "from-orange-500 to-red-500",
    trend: "up",
    trendPercentage: 15,
  },
  {
    id: "2",
    category: "Transportation",
    spent: 180,
    budget: 300,
    color: "bg-blue-500",
    icon: "🚗",
    gradient: "from-blue-500 to-indigo-500",
    trend: "down",
    trendPercentage: 8,
  },
  {
    id: "3",
    category: "Shopping",
    spent: 280,
    budget: 400,
    color: "bg-pink-500",
    icon: "🛍️",
    gradient: "from-pink-500 to-rose-500",
    trend: "up",
    trendPercentage: 25,
  },
]

export function BudgetProgress() {
  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0)
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0)
  const overallProgress = (totalSpent / totalBudget) * 100

  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <CardTitle className="section-title">Budget Progress</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl font-semibold"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="section-content">
        {/* Overall Budget Summary */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200/60 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-900">Overall Budget</h3>
              <p className="text-xs text-gray-600">Total progress</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-gray-900">{overallProgress.toFixed(1)}%</div>
            </div>
          </div>
          <Progress
            value={overallProgress}
            className="h-2 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-gray-900 [&>div]:to-gray-700"
          />
          <div className="flex justify-between text-xs font-semibold mt-2">
            <span className="text-gray-600">${totalSpent.toLocaleString()}</span>
            <span className="text-gray-600">${totalBudget.toLocaleString()}</span>
          </div>
        </div>

        {/* Individual Budget Items - Compact */}
        <div className="space-y-4">
          {budgetData.map((item) => {
            const percentage = (item.spent / item.budget) * 100
            const isOverBudget = percentage > 100
            const isNearLimit = percentage > 80 && percentage <= 100
            const remaining = item.budget - item.spent

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-sm shadow-md`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.category}</h4>
                      <div className="flex items-center gap-1">
                        {item.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 text-red-600" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-green-600" />
                        )}
                        <span
                          className={`text-xs font-semibold ${item.trend === "up" ? "text-red-600" : "text-green-600"}`}
                        >
                          {item.trend === "up" ? "+" : "-"}
                          {item.trendPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      ${item.spent}/${item.budget}
                    </div>
                    <div className={`text-xs font-semibold ${remaining >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      ${Math.abs(remaining)} {remaining >= 0 ? "left" : "over"}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Progress
                    value={Math.min(percentage, 100)}
                    className={`h-2 rounded-full ${
                      isOverBudget
                        ? "[&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600"
                        : `[&>div]:bg-gradient-to-r [&>div]:${item.gradient}`
                    }`}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {isOverBudget ? (
                        <AlertTriangle className="h-3 w-3 text-red-600" />
                      ) : isNearLimit ? (
                        <AlertTriangle className="h-3 w-3 text-amber-600" />
                      ) : (
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                      )}
                      <span className={`text-xs font-bold ${isOverBudget ? "text-red-600" : "text-gray-600"}`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      {isOverBudget ? "Over budget" : isNearLimit ? "Near limit" : "On track"}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
