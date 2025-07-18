import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function BudgetOverview() {
  const totalBudget = 4000
  const totalSpent = 3240.89
  const remaining = totalBudget - totalSpent
  const progress = (totalSpent / totalBudget) * 100

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle className="text-slate-800">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="text-center">
            <p className="text-sm text-slate-600">Total Budget</p>
            <p className="text-2xl font-bold text-slate-800">${totalBudget.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Spent</p>
            <p className="text-2xl font-bold text-red-600">${totalSpent.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Remaining</p>
            <p className="text-2xl font-bold text-green-600">${remaining.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Progress</p>
            <p className="text-2xl font-bold text-blue-600">{progress.toFixed(1)}%</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600">Overall Progress</span>
            <span className="text-slate-600">{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}
