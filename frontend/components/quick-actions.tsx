import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Plus, Target, Upload, Zap } from "lucide-react"

const quickActions = [
  {
    title: "Add Transaction",
    description: "Record a new expense or income",
    icon: <Plus className="h-5 w-5" />,
    gradient: "from-blue-500 to-indigo-500",
    shortcut: "⌘ + T",
  },
  {
    title: "Set Budget",
    description: "Create a new budget category",
    icon: <Target className="h-5 w-5" />,
    gradient: "from-green-500 to-emerald-500",
    shortcut: "⌘ + B",
  },
  {
    title: "Import Data",
    description: "Upload CSV or bank statements",
    icon: <Upload className="h-5 w-5" />,
    gradient: "from-purple-500 to-violet-500",
    shortcut: "⌘ + I",
  },
  {
    title: "View Analytics",
    description: "Detailed spending insights",
    icon: <PieChart className="h-5 w-5" />,
    gradient: "from-orange-500 to-red-500",
    shortcut: "⌘ + A",
  },
]

export function QuickActions() {
  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center gap-3">
          <CardTitle className="section-title">Quick Actions</CardTitle>
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-50/80 border border-blue-200/60">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Keyboard shortcuts</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="section-content">
        <div className="grid gap-4">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Button
                variant="outline"
                className="w-full h-auto p-6 justify-start relative bg-white/80 backdrop-blur-sm hover:bg-white border-gray-300/60 group-hover:scale-[1.02] transition-all duration-300 rounded-2xl"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                />

                <div className="relative flex items-center gap-4 w-full">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    {action.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-gray-900 text-lg">{action.title}</div>
                    <div className="text-sm text-gray-600 font-medium">{action.description}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="hidden group-hover:block text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-lg whitespace-nowrap">
                      {action.shortcut}
                    </div>
                    <div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200/60 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-gray-900">Pro Tip</h4>
              <p className="text-sm text-gray-600 font-medium">
                Use keyboard shortcuts to quickly access these actions. Hover over any action to see its shortcut.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
