import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  iconBg: string
  gradient: string
}

function MetricCard({ title, value, change, changeType, icon, iconBg, gradient }: MetricCardProps) {
  const changeColor = {
    positive: "amount-positive",
    negative: "amount-negative",
    neutral: "amount-neutral",
  }[changeType]

  const ChangeIcon = changeType === "positive" ? ArrowUpIcon : changeType === "negative" ? ArrowDownIcon : TrendingUp

  return (
    <Card className="metric-card group">
      <div className={`h-1 ${gradient} rounded-t-2xl`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</CardTitle>
        <div className={`p-3 rounded-xl ${iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-black text-gray-900">{value}</div>
        <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
          <ChangeIcon className="mr-2 h-4 w-4" />
          {change}
        </div>
      </CardContent>
    </Card>
  )
}

export function MetricsCards() {
  const metrics = [
    {
      title: "Total Balance",
      value: "$12,450.67",
      change: "+2.5% from last month",
      changeType: "positive" as const,
      icon: <DollarSign className="h-5 w-5 text-emerald-700" />,
      iconBg: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      gradient: "bg-gradient-to-r from-emerald-500 to-green-500",
    },
    {
      title: "Monthly Spending",
      value: "$3,240.89",
      change: "+12% from last month",
      changeType: "negative" as const,
      icon: <TrendingDown className="h-5 w-5 text-red-700" />,
      iconBg: "bg-gradient-to-br from-red-100 to-red-200",
      gradient: "bg-gradient-to-r from-red-500 to-rose-500",
    },
    {
      title: "Monthly Income",
      value: "$5,800.00",
      change: "Same as last month",
      changeType: "neutral" as const,
      icon: <TrendingUp className="h-5 w-5 text-blue-700" />,
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
      gradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
    {
      title: "Savings Rate",
      value: "44.2%",
      change: "+5.2% from last month",
      changeType: "positive" as const,
      icon: <PiggyBank className="h-5 w-5 text-purple-700" />,
      iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
      gradient: "bg-gradient-to-r from-purple-500 to-violet-500",
    },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
