import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function BudgetsHeader() {
  return (
    <div className="page-header">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <h1 className="page-title">Budgets</h1>
          <p className="page-subtitle">Set and track your spending limits across categories</p>
        </div>
        <Button className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Create Budget
        </Button>
      </div>
    </div>
  )
}
