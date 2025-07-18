import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react"

interface Insight {
  id: string
  message: string
  type: "warning" | "success" | "info"
  icon: React.ReactNode
  gradient: string
}

const insights: Insight[] = [
  {
    id: "1",
    message: "You're spending 15% more on dining this month compared to last month.",
    type: "warning",
    icon: <AlertTriangle className="h-5 w-5" />,
    gradient: "from-red-500 to-rose-500",
  },
  {
    id: "2",
    message: "Great job staying under budget for groceries! You've saved $150.",
    type: "success",
    icon: <CheckCircle className="h-5 w-5" />,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "3",
    message: "Consider setting up automatic savings to reach your $2,000 monthly goal.",
    type: "info",
    icon: <Lightbulb className="h-5 w-5" />,
    gradient: "from-blue-500 to-indigo-500",
  },
]

export function AIInsights() {
  const getInsightStyle = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-gradient-to-r from-red-50 to-rose-50 border-red-200/60 text-red-700"
      case "success":
        return "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200/60 text-emerald-700"
      case "info":
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/60 text-blue-700"
      default:
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/60 text-blue-700"
    }
  }

  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <CardTitle className="flex items-center gap-3 section-title">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="section-content">
        <div className="space-y-6">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`flex items-start gap-4 p-6 rounded-2xl border-2 ${getInsightStyle(insight.type)} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
              >
                {insight.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold leading-relaxed">{insight.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
