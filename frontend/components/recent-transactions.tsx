import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, MoreVertical, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: "income" | "expense"
  status: "completed" | "pending"
  icon: string
  gradient: string
}

const recentTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-18",
    description: "Whole Foods Market",
    category: "Food & Dining",
    amount: -85.5,
    type: "expense",
    status: "completed",
    icon: "🍽️",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "2",
    date: "2024-01-18",
    description: "Monthly Salary",
    category: "Income",
    amount: 5800.0,
    type: "income",
    status: "completed",
    icon: "💰",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "3",
    date: "2024-01-17",
    description: "Shell Gas Station",
    category: "Transportation",
    amount: -45.0,
    type: "expense",
    status: "completed",
    icon: "🚗",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "4",
    date: "2024-01-17",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    type: "expense",
    status: "completed",
    icon: "🎬",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: "5",
    date: "2024-01-16",
    description: "Starbucks Coffee",
    category: "Food & Dining",
    amount: -4.5,
    type: "expense",
    status: "pending",
    icon: "☕",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "6",
    date: "2024-01-16",
    description: "Amazon Purchase",
    category: "Shopping",
    amount: -67.89,
    type: "expense",
    status: "completed",
    icon: "🛍️",
    gradient: "from-pink-500 to-rose-500",
  },
]

export function RecentTransactions() {
  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <CardTitle className="section-title">Recent Transactions</CardTitle>
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
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="group flex items-center justify-between p-6 rounded-2xl hover:bg-gray-50/80 transition-all duration-300 border border-transparent hover:border-gray-200/60 hover:shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${transaction.gradient} flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  {transaction.icon}
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-gray-900">{transaction.description}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-500 font-medium">{transaction.category}</p>
                    <Badge
                      className={`text-xs px-3 py-1 font-semibold ${
                        transaction.status === "completed" ? "status-success" : "status-warning"
                      }`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right space-y-1">
                  <p
                    className={`font-black text-lg ${transaction.type === "income" ? "amount-positive" : "amount-negative"}`}
                  >
                    {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>

                {/* Elegant Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/80 hover:shadow-lg backdrop-blur-sm border border-gray-200/50"
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
                      <span className="font-medium text-gray-700">Edit Transaction</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-red-50 transition-colors duration-200 text-red-600 focus:text-red-600">
                      <Trash2 className="mr-3 h-4 w-4" />
                      <span className="font-medium">Delete Transaction</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
