import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, TrendingUp, TrendingDown, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Category {
  id: string
  name: string
  icon: string
  color: string
  type: "income" | "expense"
  transactionCount: number
  totalSpent: number
  gradient: string
}

const categories: Category[] = [
  {
    id: "1",
    name: "Food & Dining",
    icon: "🍽️",
    color: "text-orange-700",
    type: "expense",
    transactionCount: 45,
    totalSpent: 1134,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "2",
    name: "Transportation",
    icon: "🚗",
    color: "text-blue-700",
    type: "expense",
    transactionCount: 23,
    totalSpent: 486,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "3",
    name: "Entertainment",
    icon: "🎬",
    color: "text-purple-700",
    type: "expense",
    transactionCount: 18,
    totalSpent: 324,
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: "4",
    name: "Shopping",
    icon: "🛍️",
    color: "text-pink-700",
    type: "expense",
    transactionCount: 31,
    totalSpent: 648,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "5",
    name: "Health & Fitness",
    icon: "💪",
    color: "text-green-700",
    type: "expense",
    transactionCount: 8,
    totalSpent: 162,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "6",
    name: "Utilities",
    icon: "⚡",
    color: "text-yellow-700",
    type: "expense",
    transactionCount: 12,
    totalSpent: 324,
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    id: "7",
    name: "Housing",
    icon: "🏠",
    color: "text-indigo-700",
    type: "expense",
    transactionCount: 6,
    totalSpent: 162,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: "8",
    name: "Income",
    icon: "💰",
    color: "text-emerald-700",
    type: "income",
    transactionCount: 4,
    totalSpent: 7000,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "9",
    name: "Savings",
    icon: "💎",
    color: "text-teal-700",
    type: "expense",
    transactionCount: 2,
    totalSpent: 815,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    id: "10",
    name: "Education",
    icon: "📚",
    color: "text-slate-700",
    type: "expense",
    transactionCount: 3,
    totalSpent: 89,
    gradient: "from-slate-500 to-gray-500",
  },
]

export function CategoriesGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
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
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{category.name}</h3>
                  <div className="flex items-center gap-2">
                    {category.type === "income" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-semibold uppercase tracking-wide ${category.type === "income" ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {category.type}
                    </span>
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
                    <span className="font-medium text-gray-700">Edit Category</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-red-50 transition-colors duration-200 text-red-600 focus:text-red-600">
                    <Trash2 className="mr-3 h-4 w-4" />
                    <span className="font-medium">Delete Category</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50/80 backdrop-blur-sm">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Transactions</span>
                <span className="text-2xl font-black text-gray-900">{category.transactionCount}</span>
              </div>

              <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50/80 backdrop-blur-sm">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Amount</span>
                <span
                  className={`text-2xl font-black ${category.type === "income" ? "text-emerald-600" : "text-red-600"}`}
                >
                  {category.type === "income" ? "+" : "-"}${category.totalSpent.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Bottom Accent */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
