import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Target, PieChart } from "lucide-react"

const quickActions = [
  {
    title: "Add Transaction",
    description: "Record a new expense or income",
    icon: <Plus className="h-5 w-5" />,
    gradient: "from-blue-500 to-indigo-500",
    action: "primary",
  },
  {
    title: "Set Budget",
    description: "Create a new budget category",
    icon: <Target className="h-5 w-5" />,
    gradient: "from-green-500 to-emerald-500",
    action: "secondary",
  },
  {
    title: "Import Data",
    description: "Upload CSV or bank statements",
    icon: <Upload className="h-5 w-5" />,
    gradient: "from-purple-500 to-violet-500",
    action: "secondary",
  },
  {
    title: "View Analytics",
    description: "Detailed spending insights",
    icon: <PieChart className="h-5 w-5" />,
    gradient: "from-orange-500 to-red-500",
    action: "secondary",
  },
]

export function QuickActions() {
  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <CardTitle className="section-title">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="section-content">
        <div className="grid gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.action === "primary" ? "default" : "outline"}
              className={`h-auto p-4 justify-start ${
                action.action === "primary" ? "btn-primary" : "btn-secondary bg-transparent hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white shadow-lg mr-4 flex-shrink-0`}
              >
                {action.icon}
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{action.title}</div>
                <div className="text-sm text-gray-600 font-medium">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
