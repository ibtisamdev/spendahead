import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, PiggyBank, Target, TrendingDown, TrendingUp } from "lucide-react"

export function BudgetOverview() {
  const totalBudget = 4000
  const totalSpent = 3240.89
  const remaining = totalBudget - totalSpent
  const progress = (totalSpent / totalBudget) * 100
  const isOverBudget = totalSpent > totalBudget
  const isNearLimit = progress > 80 && progress <= 100

  const budgetMetrics = [
    {
      title: "Total Budget",
      value: `$${totalBudget.toLocaleString()}`,
      icon: <Target className="h-5 w-5" />,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      description: "Monthly limit",
    },
    {
      title: "Total Spent",
      value: `$${totalSpent.toLocaleString()}`,
      icon: <DollarSign className="h-5 w-5" />,
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-50 to-rose-50",
      description: "This month",
    },
    {
      title: "Remaining",
      value: `$${Math.abs(remaining).toLocaleString()}`,
      icon: <PiggyBank className="h-5 w-5" />,
      gradient: remaining >= 0 ? "from-emerald-500 to-green-500" : "from-red-500 to-rose-500",
      bgGradient: remaining >= 0 ? "from-emerald-50 to-green-50" : "from-red-50 to-rose-50",
      description: remaining >= 0 ? "Available" : "Over budget",
    },
    {
      title: "Progress",
      value: `${progress.toFixed(1)}%`,
      icon: <TrendingUp className="h-5 w-5" />,
      gradient: isOverBudget ? "from-red-500 to-rose-500" : isNearLimit ? "from-amber-500 to-orange-500" : "from-emerald-500 to-green-500",
      bgGradient: isOverBudget ? "from-red-50 to-rose-50" : isNearLimit ? "from-amber-50 to-orange-50" : "from-emerald-50 to-green-50",
      description: "Budget usage",
    },
  ]

  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <CardTitle className="flex items-center gap-3 section-title">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          Budget Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="section-content">
        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {budgetMetrics.map((metric, index) => (
            <div
              key={index}
              className="group relative overflow-hidden p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-300 hover:shadow-lg"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-30 group-hover:opacity-40 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {metric.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {metric.description}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-black text-gray-900">{metric.value}</div>
                  <div className="text-sm font-semibold text-gray-600">{metric.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Progress Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200/60 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-lg">Overall Budget Progress</h3>
              <p className="text-sm text-gray-600 font-medium">
                {isOverBudget ? "You're over budget" : isNearLimit ? "Approaching budget limit" : "You're on track"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-gray-900">{progress.toFixed(1)}%</div>
              <div className="text-xs font-semibold text-gray-600">
                {isOverBudget ? "Over by $" + Math.abs(remaining).toLocaleString() : "$" + remaining.toLocaleString() + " left"}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <Progress
              value={Math.min(progress, 100)}
              className={`h-3 rounded-full ${isOverBudget
                  ? "[&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600"
                  : isNearLimit
                    ? "[&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-orange-500"
                    : "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-green-500"
                }`}
            />

            {/* Progress Details */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {isOverBudget ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : isNearLimit ? (
                    <TrendingUp className="h-4 w-4 text-amber-600" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  )}
                  <span className={`font-semibold ${isOverBudget ? "text-red-600" : isNearLimit ? "text-amber-600" : "text-emerald-600"
                    }`}>
                    {isOverBudget ? "Over Budget" : isNearLimit ? "Near Limit" : "On Track"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
                <span>Spent: ${totalSpent.toLocaleString()}</span>
                <span>Budget: ${totalBudget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
