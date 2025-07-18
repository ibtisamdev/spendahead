import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Calendar, CreditCard } from "lucide-react"

const stats = [
  {
    title: "This Month",
    value: "$3,241.89",
    change: "+12.5%",
    changeType: "negative" as const,
    icon: <Calendar className="h-5 w-5" />,
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50",
    count: "47 transactions",
  },
  {
    title: "Average Transaction",
    value: "$68.98",
    change: "-5.2%",
    changeType: "positive" as const,
    icon: <DollarSign className="h-5 w-5" />,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    count: "vs last month",
  },
  {
    title: "Largest Expense",
    value: "$1,200.00",
    change: "Housing",
    changeType: "neutral" as const,
    icon: <TrendingDown className="h-5 w-5" />,
    gradient: "from-red-500 to-rose-500",
    bgGradient: "from-red-50 to-rose-50",
    count: "Jan 15, 2024",
  },
  {
    title: "Pending",
    value: "3",
    change: "Review needed",
    changeType: "neutral" as const,
    icon: <CreditCard className="h-5 w-5" />,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    count: "$127.45 total",
  },
]

export function TransactionStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2"
        >
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-30 group-hover:opacity-40 transition-opacity duration-500`}
          />

          {/* Top Gradient Bar */}
          <div className={`h-2 bg-gradient-to-r ${stat.gradient} rounded-t-3xl`} />

          <CardContent className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
              <div className="text-right">
                <div
                  className={`flex items-center gap-1 text-sm font-bold ${
                    stat.changeType === "positive"
                      ? "text-emerald-600"
                      : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : stat.changeType === "negative" ? (
                    <TrendingDown className="h-4 w-4" />
                  ) : null}
                  {stat.change}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.title}</h3>
              <div className="text-3xl font-black text-gray-900">{stat.value}</div>
              <p className="text-sm text-gray-500 font-medium">{stat.count}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
