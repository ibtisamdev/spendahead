import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Lightbulb, Target, ArrowRight } from "lucide-react"

const insights = [
  {
    id: "1",
    title: "Spending Alert",
    description: "You've increased dining expenses by 25% this month. Consider setting a stricter budget.",
    type: "warning",
    icon: <AlertCircle className="h-6 w-6" />,
    gradient: "from-red-500 to-rose-500",
    bgColor: "from-red-50 to-rose-50",
    borderColor: "border-red-200/60",
    textColor: "text-red-700",
    action: "Set Budget Limit",
    priority: "high",
  },
  {
    id: "2",
    title: "Savings Achievement",
    description: "Great job! You've maintained a 44% savings rate for 3 consecutive months.",
    type: "success",
    icon: <CheckCircle className="h-6 w-6" />,
    gradient: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    borderColor: "border-green-200/60",
    textColor: "text-green-700",
    action: "View Savings Plan",
    priority: "medium",
  },
  {
    id: "3",
    title: "Optimization Opportunity",
    description: "You could save $180/month by switching to a different subscription plan for entertainment.",
    type: "info",
    icon: <Lightbulb className="h-6 w-6" />,
    gradient: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200/60",
    textColor: "text-blue-700",
    action: "Review Subscriptions",
    priority: "medium",
  },
  {
    id: "4",
    title: "Budget Performance",
    description: "You're 15% under budget in transportation this month. Consider reallocating funds.",
    type: "success",
    icon: <Target className="h-6 w-6" />,
    gradient: "from-emerald-500 to-green-500",
    bgColor: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200/60",
    textColor: "text-emerald-700",
    action: "Reallocate Budget",
    priority: "low",
  },
]

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-700 border-green-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export function AnalyticsInsights() {
  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-3 section-title">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              AI-Powered Insights
            </CardTitle>
            <p className="text-sm text-gray-600 font-medium">
              Personalized recommendations based on your spending patterns
            </p>
          </div>
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
        <div className="grid gap-6 md:grid-cols-2">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`group relative overflow-hidden p-6 rounded-2xl border-2 bg-gradient-to-r ${insight.bgColor} ${insight.borderColor} hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
            >
              {/* Priority Badge */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${getPriorityBadge(insight.priority)}`}
                >
                  {insight.priority} Priority
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {insight.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className={`font-bold text-lg ${insight.textColor}`}>{insight.title}</h3>
                <p className={`text-sm font-medium leading-relaxed ${insight.textColor} opacity-90`}>
                  {insight.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-current/20">
                <Button
                  size="sm"
                  className={`w-full bg-gradient-to-r ${insight.gradient} hover:opacity-90 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  {insight.action}
                </Button>
              </div>

              {/* Decorative Element */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${insight.gradient} opacity-10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
