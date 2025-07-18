import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, MoreVertical, TrendingDown, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface BudgetCategory {
  id: string
  category: string
  spent: number
  budget: number
  color: string
  icon: string
  gradient: string
}

const budgetCategories: BudgetCategory[] = [
  {
    id: "1",
    category: "Food & Dining",
    spent: 450,
    budget: 600,
    color: "bg-orange-500",
    icon: "🍽️",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "2",
    category: "Transportation",
    spent: 180,
    budget: 300,
    color: "bg-blue-500",
    icon: "🚗",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "3",
    category: "Entertainment",
    spent: 120,
    budget: 200,
    color: "bg-purple-500",
    icon: "🎬",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: "4",
    category: "Shopping",
    spent: 280,
    budget: 400,
    color: "bg-pink-500",
    icon: "🛍️",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "5",
    category: "Health & Fitness",
    spent: 45,
    budget: 100,
    color: "bg-green-500",
    icon: "💪",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "6",
    category: "Utilities",
    spent: 150,
    budget: 200,
    color: "bg-yellow-500",
    icon: "⚡",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    id: "7",
    category: "Housing",
    spent: 1200,
    budget: 1500,
    color: "bg-indigo-500",
    icon: "🏠",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: "8",
    category: "Savings",
    spent: 815,
    budget: 1000,
    color: "bg-teal-500",
    icon: "💎",
    gradient: "from-teal-500 to-cyan-500",
  },
]

export function BudgetCategories() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {budgetCategories.map((category) => {
        const percentage = (category.spent / category.budget) * 100
        const isOverBudget = percentage > 100
        const remaining = category.budget - category.spent

        return (
          <Card
            key={category.id}
            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
            />

            {/* Top Gradient Bar */}
            <div className={`h-2 bg-gradient-to-r ${category.gradient} rounded-t-3xl`} />

            <CardContent className="relative p-8">
              {/* Header with Icon and Menu */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">{category.category}</h3>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-semibold uppercase tracking-wide text-red-600">Budget</span>
                    </div>
                  </div>
                </div>

                {/* Elegant Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/80 hover:shadow-lg backdrop-blur-sm border border-gray-200/50"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-md p-2"
                  >
                    <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <Edit className="mr-3 h-4 w-4 text-gray-600" />
                      <span className="font-medium text-gray-700">Edit Budget</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-red-50 transition-colors duration-200 text-red-600 focus:text-red-600">
                      <Trash2 className="mr-3 h-4 w-4" />
                      <span className="font-medium">Delete Budget</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Budget Progress Section */}
              <div className="space-y-6">
                {/* Amount Display */}
                <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50/80 backdrop-blur-sm">
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Spent</span>
                    <div className="text-2xl font-black text-gray-900">${category.spent}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Budget</span>
                    <div className="text-2xl font-black text-gray-900">${category.budget}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <Progress
                    value={Math.min(percentage, 100)}
                    className={`h-3 rounded-full ${isOverBudget ? "[&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600" : `[&>div]:bg-gradient-to-r [&>div]:${category.gradient}`}`}
                  />

                  {/* Progress Stats */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {isOverBudget && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      <span className={`text-sm font-bold ${isOverBudget ? "text-red-600" : "text-gray-600"}`}>
                        {percentage.toFixed(0)}% used
                      </span>
                    </div>
                    <span className={`text-sm font-bold ${remaining >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      ${Math.abs(remaining)} {remaining >= 0 ? "remaining" : "over budget"}
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div
                  className={`p-4 rounded-2xl border-2 ${
                    isOverBudget
                      ? "bg-red-50/80 border-red-200 text-red-700"
                      : percentage > 80
                        ? "bg-amber-50/80 border-amber-200 text-amber-700"
                        : "bg-emerald-50/80 border-emerald-200 text-emerald-700"
                  } backdrop-blur-sm`}
                >
                  <div className="flex items-center gap-2">
                    {isOverBudget ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : percentage > 80 ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-current" />
                    )}
                    <span className="text-sm font-semibold">
                      {isOverBudget ? "Over Budget" : percentage > 80 ? "Approaching Limit" : "On Track"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
