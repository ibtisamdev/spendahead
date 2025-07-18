import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react"

const topMerchants = [
  {
    name: "Whole Foods Market",
    category: "Groceries",
    amount: 1134,
    transactions: 24,
    trend: "up",
    trendValue: 15,
    icon: "🛒",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Shell Gas Station",
    category: "Transportation",
    amount: 486,
    transactions: 18,
    trend: "down",
    trendValue: 8,
    icon: "⛽",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "Amazon",
    category: "Shopping",
    amount: 648,
    transactions: 31,
    trend: "up",
    trendValue: 25,
    icon: "📦",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Netflix",
    category: "Entertainment",
    amount: 47.97,
    transactions: 3,
    trend: "stable",
    trendValue: 0,
    icon: "🎬",
    gradient: "from-red-500 to-rose-500",
  },
  {
    name: "Starbucks",
    category: "Food & Dining",
    amount: 156,
    transactions: 12,
    trend: "up",
    trendValue: 12,
    icon: "☕",
    gradient: "from-amber-500 to-orange-500",
  },
]

export function TopMerchants() {
  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <CardTitle className="section-title">Top Merchants</CardTitle>
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
          {topMerchants.map((merchant, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/80 transition-all duration-300 border border-transparent hover:border-gray-200/60 hover:shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${merchant.gradient} flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  {merchant.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 truncate">{merchant.name}</h4>
                    {merchant.trend !== "stable" && (
                      <div
                        className={`flex items-center gap-1 ${merchant.trend === "up" ? "text-red-600" : "text-green-600"}`}
                      >
                        {merchant.trend === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span className="text-xs font-bold">
                          {merchant.trend === "up" ? "+" : "-"}
                          {merchant.trendValue}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="status-info text-xs font-medium">
                      {merchant.category}
                    </Badge>
                    <span className="text-xs text-gray-500 font-medium">{merchant.transactions} transactions</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-gray-900">${merchant.amount.toLocaleString()}</div>
                <div className="text-xs text-gray-500 font-medium">
                  ${(merchant.amount / merchant.transactions).toFixed(2)} avg
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
