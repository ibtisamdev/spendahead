import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Target, PieChart, Calendar } from "lucide-react"

const summaryMetrics = [
  {
    title: "Total Spending",
    value: "$19,456",
    change: "+12.5%",
    changeType: "negative" as const,
    icon: <DollarSign className="h-6 w-6" />,
    gradient: "from-red-500 to-rose-500",
    bgGradient: "from-red-50 to-rose-50",
    description: "vs last 6 months",
  },
  {
    title: "Average Monthly",
    value: "$3,243",
    change: "+8.2%",
    changeType: "negative" as const,
    icon: <Calendar className="h-6 w-6" />,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    description: "monthly average",
  },
  {
    title: "Budget Efficiency",
    value: "81%",
    change: "+5.3%",
    changeType: "positive" as const,
    icon: <Target className="h-6 w-6" />,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    description: "budget utilization",
  },
  {
    title: "Top Category",
    value: "Food & Dining",
    change: "35%",
    changeType: "neutral" as const,
    icon: <PieChart className="h-6 w-6" />,
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50",
    description: "of total spending",
  },
]

export function AnalyticsSummary() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {summaryMetrics.map((metric, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2"
        >
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-30 group-hover:opacity-40 transition-opacity duration-500`}
          />

          {/* Top Gradient Bar */}
          <div className={`h-2 bg-gradient-to-r ${metric.gradient} rounded-t-3xl`} />

          <CardContent className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {metric.icon}
              </div>
              <div className="text-right">
                <div
                  className={`flex items-center gap-1 text-sm font-bold ${
                    metric.changeType === "positive"
                      ? "text-emerald-600"
                      : metric.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  {metric.changeType === "positive" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : metric.changeType === "negative" ? (
                    <TrendingDown className="h-4 w-4" />
                  ) : null}
                  {metric.change}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{metric.title}</h3>
              <div className="text-3xl font-black text-gray-900">{metric.value}</div>
              <p className="text-sm text-gray-500 font-medium">{metric.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
